var padding = 40;
var h = 400;
var w = 700;

// Dataset array with pairs of coordinates
var dataset = [
    [5, 20],
    [500, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [85, 21],
    [220, 88],
];
// Create a D3.js scale for x
var xScale = d3
    .scaleLinear()
    .domain([
        0,
        d3.max(dataset, function (d) {
            return d[0];
        }),
    ])
    .range([padding, w - padding]);
// Create a D3.js scale for y
var yScale = d3
    .scaleLinear()
    .domain([
        0,
        d3.max(dataset, function (d) {
            return d[1];
        }),
    ])
    .range([h - padding, padding]);

var rScale = d3
    .scaleLinear()
    .domain([
        0,
        d3.max(dataset, function (d) {
            return d[1];
        }),
    ])
    .range([2, 5]);
var xAxis = d3.axisTop().scale(xScale).ticks(10);

var yAxis = d3.axisLeft().scale(yScale).ticks(10);
// Create an SVG element and set its width and height
var svg = d3
    .select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h).attr("style", "outline: 1px solid black;");

// Create circles based on the dataset
svg
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function (d, i) {
        // Set the x-coordinate of the circle
        return xScale(d[0]);
    })
    .attr("cy", function (d, i) {
        // Set the y-coordinate of the circle
        return yScale(d[1]);
    })
    .attr("r", function (d, i) { return rScale(d[1]) }) // Set the radius of the circle
    .attr("fill", function (d, i) {
        if (d[0] > 470) {
            return "red";
        } else {
            return "blue";
        }
    }); // Set the fill color of the circle

// Create text labels based on the dataset
svg
    .selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function (d) {
        // Set the text content based on the coordinates
        return d[0] + "," + d[1];
    })
    .attr("x", function (d) {
        // Set the x-coordinate of the text label
        return xScale(d[0] - 10);
    })
    .attr("y", function (d) {
        // Set the y-coordinate of the text label
        return yScale(d[1] + 2);
    })
    .attr("font-size", "10px");

svg
    .append("g")
    .attr("transform", "translate(0," + padding + ")")
    .call(xAxis);

svg
    .append("g")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);
