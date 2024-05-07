var padding = 40;
var h = 400;
var w = 700;

// Dataset array with pairs of coordinates
var dataset = [15, 24, 65, 76, 34, 65, 34, 45];
var xScale = d3.scaleBand().domain(d3.range(dataset.length)).range([0, w - padding]).paddingInner(0.05);
// Create a D3.js scale for x   
var yScale = d3.scaleLinear().domain([0, d3.max(dataset)]).range([0, h - padding]);
// Create an SVG element and set its width and height
var svg = d3
    .select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);


// Create rectangles for each data point in the dataset
svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
        // Calculate the x-coordinate based on the index and bar width
        return xScale(i);
    })
    .attr("y", function (d) {
        return h - yScale(d);
    }) // Set the initial y-coordinate
    .attr("width", xScale.bandwidth())
    .attr("height", function (d, i) { return yScale(d); })
    .attr("fill", "slategrey")
    .on("mouseover", function (d, i) {
        d3.select(this).attr("fill", "orange");
        var xPosition = parseFloat(d3.select(this).attr("x"));
        var tempWidth = parseFloat(d3.select(this).attr("width"));
        var tempHeight = parseFloat(d3.select(this).attr("height"));
        var yPosition = parseFloat(d3.select(this).attr("y"));
        svg.append("text").attr("id", "tooltip").attr("x", xPosition + xScale.bandwidth() / 2).attr("y", yPosition + 20).text(d).style("text-anchor", "middle");
    }).attr("fill", "slategrey").on("mouseout", function () {
        d3.select(this).attr("fill", "slategrey");
        d3.select("#tooltip").remove();
    });


maxValue = 25;


d3.select("#update").on("click", function () {
    var numValues = dataset.length;

    dataset = [];
    for (var i = 0; i < numValues; i++) {
        var newNum = Math.floor(Math.random() * 25);
        dataset.push(newNum);
    }
    console.log(dataset);
    yScale.domain([0, d3.max(dataset)]);
    var bars = svg
        .selectAll("rect")
        .data(dataset);
    bars
        .transition()
        .merge(bars)
        .duration(500)
        .ease(d3.easeElasticOut)
        .attr("y", function (d) { return h - yScale(d); })
        .attr("height", function (d) { return yScale(d); });

});

d3.select("#add").on("click", function () {

    var newNum = Math.floor(Math.random() * maxValue);
    dataset.push(newNum);
    xScale.domain(d3.range(dataset.length));
    var bars = svg
        .selectAll("rect")
        .data(dataset);
    console.log(dataset);
    bars.enter()
        .append("rect")
        .merge(bars)
        .attr("fill", "slategrey")
        .on("mouseover", function (d, i) {
            d3.select(this).attr("fill", "orange");
            var xPosition = parseFloat(d3.select(this).attr("x"));
            var yPosition = parseFloat(d3.select(this).attr("y"));
            svg.append("text").attr("id", "tooltip").attr("x", xPosition + xScale.bandwidth() / 2).attr("y", yPosition + 20).text(d).attr("text-anchor", "middle");
        }).attr("fill", "slategrey")
        .on("mouseout", function () {
            d3.select(this).attr("fill", "slategrey");
            d3.select("#tooltip").remove()


        }).transition()
        .duration(500)

        .attr("x", function (d, i) { return xScale(i); })
        .attr("y", function (d) {
            return h - yScale(d);
        }) // Set the initial y-coordinate

        .attr("width", xScale.bandwidth())
        .attr("height", function (d, i) { return yScale(d); });


});
d3.select("#remove").on("click", function () {

    dataset.shift();
    xScale.domain(d3.range(dataset.length));
    console.log(dataset);
    var bars = svg
        .selectAll("rect")
        .data(dataset);
    bars.exit()
        .transition().duration(500)
        .attr("x", w)
        .remove();
    bars
        .transition()
        .duration(500)

        .attr("x", function (d, i) { return xScale(i); })

        .attr("width", xScale.bandwidth());
});


sortOption = true;
d3.select("#sort").on("click", function () {
    if (sortOption) {
        svg.selectAll("rect")
            .sort(function (a, b) {
                return d3.ascending(a, b);
            })
            .transition("sort")
            .duration(500)
            .attr("x", function (d, i) {
                return xScale(i);
            });
    } else {
        svg.selectAll("rect")
            .sort(function (a, b) {
                return d3.descending(a, b);
            })
            .transition("sort")
            .duration(500)
            .attr("x", function (d, i) {
                return xScale(i);
            });
    }
    sortOption = !sortOption;

});