
var h = 300;
var w = 600;
var padding = 70
// Dataset array with pairs of coordinates
var dataset;

d3.csv("Unemployment_78-95.csv", function (d) {
    return {
        date: new Date(+d.year, +d.month - 1),
        number: +d.number
    };
}).then(function (data) {
    dataset = data;
    // lineChart(dataset);
    console.table(dataset, ["date", "number"]);

    xScale = d3.scaleTime()
        .domain([
            d3.min(dataset, function (d) { return d.date; }),
            d3.max(dataset, function (d) { return d.date; })
        ])
        .range([70, w]);

    yScale = d3.scaleLinear()
        .domain([
            0, d3.max(dataset, function (d) { return d.number; })
        ])
        .range([h - padding, 0]);

    // Add X and Y Axis to chart
    let xAxis = d3.axisBottom().scale(xScale);
    let yAxis = d3.axisLeft().scale(yScale);




    area = d3.area()
        .x(function (d) { return xScale(d.date); })
        .y0(function () { return yScale.range()[0]; })
        .y1(function (d) { return yScale(d.number); });

    let svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.append("path")
        .datum(dataset)
        .attr("stroke", "#red")
        .attr("stroke-width", 1.5)
        .attr("fill", "#6c8092")
        .attr("d", area);


    svg.append("g").attr("transform", "translate(70, 0)").call(yAxis);
    svg.append("g").attr("transform", "translate(0, 230)").call(xAxis);

    svg.append("line")
        .attr("class", "line halfMilMark")
        .attr("fill", "none")
        .attr("x1", padding)
        .attr("y1", yScale(500000))
        .attr("x2", w)
        .attr("y2", yScale(500000)).attr("stroke", "red !important");
    svg.append("text")
        .attr("class", "halfMilLabel")
        .attr("x", padding + 10)
        .attr("y", yScale(500000) - 7)
        .text("Half a million unemployed");

});



// Setup the scale


