// Set the dimensions of the SVG container
let h = 300;
let w = 500;

// Define the projection using d3.geoMercator
let projection = d3.geoMercator()
    .center([145, -36.5]) // Set the center of the map
    .translate([w / 2, h / 2]) // Translate the map to the center of the SVG container
    .scale(2650); // Set the scale of the projection

// Create a path generator using the projection
let path = d3.geoPath().projection(projection);

// Create an SVG element and append it to the body of the HTML document
let svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("fill", "grey"); // Set the fill color of the SVG container

// Define the color scale using d3.scaleQuantize
var color = d3.scaleQuantize().range(["#f2f0f7", "#cbc9e2", "#9e9ac8", "#756bb1", "#54278f"])
    .domain([0, 10000]) // Define the domain of the color scale
    .unknown('#f6eff7'); // Define the color for unknown values
var text = svg.append("text")
    .attr("x", 6)
    .attr("dy", 15);


// Load the CSV and JSON data using promises
d3.csv("VIC_LGA_unemployment.csv").then(function (d) {
    d3.json("LGA_VIC.json").then(function (json) {
        // Iterate through the CSV data
        for (var i = 0; i < d.length; i++) {
            var dataState = d[i].LGA; // Get the LGA from the CSV data
            var dataValue = parseFloat(d[i].unemployed); // Get the unemployment rate from the CSV data

            // Iterate through the JSON data
            for (var j = 0; j < json.features.length; j++) {
                var jsonState = json.features[j].properties.LGA_name; // Get the LGA name from the JSON data
                console.log(dataState);

                // Check if the LGA names match
                if (dataState == jsonState) {
                    json.features[j].properties.value = dataValue; // Set the value property in the JSON data
                    break;
                }
            }
        }
        // Bind data to SVG elements and append paths for each feature
        svg.selectAll("path").data(json.features).enter().append("path").attr("d", path)
            .attr("fill", function (data, i) {
                console.log(color(data.properties.value)); // Log the color value
                return color(data.properties.value); // Set the fill color based on the value property
            }).attr("stroke", 'white') // Set the stroke color of the paths
            .attr("stroke-width", "0.4")
            .attr("id", "pathID")
            // Set the stroke width of the paths
            .on("mouseover", function (d, i) {

                d3.select(this).attr("stroke", "black");
                d3.select(this).attr("stroke-width", "1");

            })
            .on("mouseout", function () {
                d3.select(this).attr("stroke", "white");
                d3.select(this).attr("stroke-width", "0.4");
            });
    });

});
