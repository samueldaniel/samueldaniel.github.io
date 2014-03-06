function Circle(cx, cy, r, d, s_w)
{
  this.cx = cx; this.cy = cy; this.r = r; this.d = d; this.s_w = s_w;
  _.bindAll(this, "generateOneWithin");
  _.bindAll(this, "fits");
  _.bindAll(this, "intersects");
  _.bindAll(this, "generateNoOverlapping");
  _.bindAll(this, "kCircles");
  _.bindAll(this, "intersectsPadding");
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
    var r = Math.floor(Math.random() * (this.r / 3)) + 5;
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

Circle.prototype.intersectsPadding = function(padding, circle) {
  var padded_r = circle.r + padding;
  var c = new Circle(circle.cx, circle.cy, padded_r, padded_r * 2);
  return this.intersects(c); 
}

Circle.prototype.generateNoOverlapping = function (circles) {
  var overlap = function(c) {
    return _.some(circles, _.partial(c.intersectsPadding, 40));
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