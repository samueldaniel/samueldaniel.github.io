
window.onload = function() {
  var draw = SVG("tree").size(300, 300);
  var encompassing = new Circle(150, 150, 150, 300);
  var cs = encompassing.kCircles(20);
  var e_c = draw.circle(encompassing.d).attr({
    cx: encompassing.cx,
    cy: encompassing.cy,
    fill: "blue"
  });
  _.each(cs, function (c) {
      draw.circle(c.d).attr({
      cx: c.cx,
      cy: c.cy,
      fill: "black"
    });
  });
  /*
  var c = draw.circle(my_circle.d).attr({
    cx: my_circle.cx,
    cy: my_circle.cy
  });*/
}
