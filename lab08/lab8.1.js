let h = 300;
let w = 500;

let projection = d3.geoMercator().center([145, -36.5]).translate([w / 2, h / 2]).scale(2650);

let path = d3.geoPath().projection(projection);

let svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("fill", "grey");

d3.json("LGA_VIC.json").then(function (json) {
    svg.selectAll("path").data(json.features).enter().append("path").attr("d", path);
})
