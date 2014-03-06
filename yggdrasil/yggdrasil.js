function Circle(cx, cy, r, d, s_w)
{
  this.cx = cx; this.cy = cy; this.r = r; this.d = d; this.s_w = s_w;
  _.bindAll(this, "generateOneWithin");
  _.bindAll(this, "fits");
  _.bindAll(this, "intersects");
  _.bindAll(this, "generateNoOverlapping");
  _.bindAll(this, "kCircles");
}

// this.fits(that) lol
Circle.prototype.fits = function(circle) {
  var centerFits = Math.pow(circle.cx - this.cx, 2) + Math.pow(circle.cy - this.cy, 2) < Math.pow(this.r, 2);
  var leftFits = Math.pow(circle.cx - circle.r - this.cx, 2) + Math.pow(circle.cy - this.cy, 2) < Math.pow(this.r, 2);
  var rightFits = Math.pow(circle.cx + circle.r - this.cx, 2) + Math.pow(circle.cy - this.cy, 2) < Math.pow(this.r, 2);
  var upFits = Math.pow(circle.cx - this.cx, 2) + Math.pow(circle.cy - circle.r - this.cy, 2) < Math.pow(this.r, 2);
  var downFits = Math.pow(circle.cx - this.cx, 2) + Math.pow(circle.cy + circle.r - this.cy, 2) < Math.pow(this.r, 2);
  return centerFits && leftFits && rightFits && upFits && downFits;
}

Circle.prototype.generateOneWithin = function() {
  var x_min = this.cx - this.r
    , x_max = this.cx + this.r
    , y_min = this.cy - this.r
    , y_max = this.cy + this.r;
  var test_circle;
  do {
    console.log (x_min + " " + x_max + " " + y_min + " " + y_max);
    var r = Math.floor(Math.random() * (this.r / 2)) + 1;
    var d = r * 2;
    var x = Math.floor(Math.random() * (x_max - x_min + 1)) + x_min;
    var y = Math.floor(Math.random() * (y_max - y_min + 1)) + y_min;
    test_circle = new Circle(x, y, r, d);
  } while (!this.fits(test_circle))
  return test_circle;
}

Circle.distance = function (c1, c2) {
  return Math.sqrt(Math.pow((c2.cy - c1.cy), 2) + Math.pow((c2.cx - c1.cx), 2));
}

Circle.prototype.intersects = function (circle) {
  var d = Circle.distance(this, circle);
  var sum_r = this.r + circle.r;
  return sum_r > d;
}

Circle.prototype.generateNoOverlapping = function (circles) {
  var overlap = function(c) {
    return _.some(circles, c.intersects);
  }
  var c;
  do {
    c = this.generateOneWithin();
  } while(overlap(c));
  return c;
}

Circle.prototype.kCircles = function (k) {
  var cs = [];
  for (var i=0; i<k; i++) {
    cs.push(this.generateNoOverlapping(cs));
  }
  return cs;
}


window.onload = function() {
  var draw = SVG("tree").size(300, 300);
  var encompassing = new Circle(150, 150, 150, 300);
  var cs = encompassing.kCircles(5);
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
