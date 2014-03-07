window.onload = function() {
  var draw = SVG("tree").size('100%', '100%');
  var encompassing = new Circle(250, 250, 250, 500);
  var cs = encompassing.kCircles(20);
  /*var e_c = draw.circle(encompassing.d).attr({
    cx: encompassing.cx,
    cy: encompassing.cy,
    fill: "grey"
  });*/
  _.each(cs, function (c) {
      var s_w = c.r / 2;
      draw.circle(c.d).attr({
        cx: c.cx,
        cy: c.cy,
        'fill-opacity': 0,
        stroke: "black",
        'stroke-width': s_w
      });
  });
}
