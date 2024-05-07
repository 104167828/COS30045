let w = 300;
let h = 300;

let dataset = [45, 24, 54, 21, 23];
let outerRadius = w / 2;
let innerRadius = 0;
let pie = d3.pie();
let arc = d3.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);
let svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);
let arcs = svg.selectAll("g.arc")
    .data(pie(dataset))
    .enter()
    .append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

let color = d3.scaleOrdinal(d3.schemeCategory10);

arcs.append("path")
    .attr("fill", (d, i) => color(i))
    .attr("d", arc);

arcs.append("text")
    .text(function (d, i) { return d.value; })
    .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")"
    });