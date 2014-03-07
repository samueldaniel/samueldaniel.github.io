width = 500;
height = 500;

window.onload = function() {
  var encompassing = new Circle(250, 250, 250, 500);
  var cs = encompassing.kCircles(20);

  var svg = d3.select("#tree")
              .attr("width", width)
              .attr("height", height);
  var nodes = svg.selectAll("node")
                 .data(cs)
                 .enter()
                 .append("circle")
                 .attr("cx", function (d) { return d.cx; })
                 .attr("cy", function (d) { return d.cy; })
                 .attr("r", function (d) { return d.r; })
                 .attr("stroke", "black")
                 .attr("stroke-width", function (d) { return d.r / 2; })
                 .attr("fill", "grey");

}
