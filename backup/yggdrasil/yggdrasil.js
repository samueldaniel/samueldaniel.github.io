width = 500;
height = 500;

window.onload = function() {
  var color = d3.scale.category20();
  var encompassing = new Circle(250, 200, 150, 300);
  var cs = _.sortBy(encompassing.kCircles(10), function (c) { return c.r; }).reverse();

  console.log(cs);

  var svg = d3.select("#tree")
              .attr("width", width)
              .attr("height", height)
              .attr("overflow", "visible");
  var nodes = svg.selectAll("g")
                 .data(cs)
                 .enter()
                 .append("g");
  nodes.append("circle")
       .attr("cx", function (d) { return d.cx; })
       .attr("cy", function (d) { return d.cy; })
       .attr("r", function (d) { return d.r; })
       .attr("stroke", "black")
       .attr("stroke-width", function (d) { return d.s_w; })
       .attr("fill", function (d, i) { return color(i); });
  nodes.append("text")
       .attr("x", function (d) { return d.cx + d.r * 1.5; })
       .attr("y", function (d) { return d.cy + d.r * 1.5; })
       .text(function (d, i) { return i;})
}
