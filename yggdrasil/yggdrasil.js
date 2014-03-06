Raphael.fn.polyline = function (x,y) {
    var poly = ['M',x,y];
    for (var i=2;i<arguments.length;i++) {
        if (i % 2 == 0) {
          poly.push('L');
        }
        poly.push(arguments[i]);
    }
    return this.path(poly.join(' '));
}

function init_paper() {
  var paper = new Raphael(document.getElementById('canvas_container', 960, 600));
  paper.customAttributes.arc = function(xloc, yloc, value, total, r) {
    var alpha = 360 / total * value,
        a = (90 + alpha) * Math.PI / 180,
        x = xloc + r * Math.cos(a),
        y = yloc + r * Math.sin(a),
        path;
    //console.log("xloc: " + xloc + " yloc: " + yloc + " total: " + total + " value: " + value + " alpha: " + alpha + " a: " + a + " x: " + x + " y: " + y);
    if (total == value) {
      //console.log("total == value");
      path = [
        ["M", xloc, yloc + r],
        ["A", r, r, 0, 1, 1, xloc + 0.01, yloc + r]
          ];
    } else {
      path = [
        ["M", xloc, yloc + r],
        ["A", r, r, 0, +(alpha > 180), 1, x, y]
          ];
    }
    return {
      path: path
    };
  };
  return paper;
};

function Circle(x, y, r, s_w)
{
  this.x = x; this.y = y; this.r = r; this.s_w = s_w;
  _.bindAll(this, "intersects");
}

function Line(start_x, start_y, end_x, end_y)
{
  this.start_x = start_x; this.start_y = start_y; this.end_x = end_x; this.end_y = end_y;
}

function drawCircle(paper, circle, delay, callback) {
  var my_arc = paper.path().attr({
    "stroke": "black",
    "stroke-width": circle.s_w,
    arc: [circle.x, circle.y, 0, 100, circle.r]
  });
  var anim = Raphael.animation({
    arc: [circle.x, circle.y, 100, 100, circle.r]
  }, 1000, "<>", callback).delay(delay);
  my_arc.animate(anim);
};

Circle.distance = function (c1, c2) {
  return Math.sqrt(Math.pow((c2.y - c1.y), 2) + Math.pow((c2.x - c1.x), 2));
}

Circle.prototype.intersects = function (circle) 
{
  var d = Circle.distance(this, circle);
  var sum_r = this.r + circle.r;
  return sum_r > d;
}

Circle.random = function (left, right, top, bottom)
{
  var x = Math.floor(Math.random() * (right - left + 1)) + left
    , y = Math.floor(Math.random() * (bottom - top + 1)) + top
    , r = 10; //Math.floor(Math.random() * (2 - 1 + 1)) + 1;
  return new Circle(x, y, r);
}

// returns a new circle not overlapping any of the given circs
function circleNotOverlapping(circles, left, right, top, bottom) {
  var overlapsCircles = function (c1) {
    return _.some(circles, c1.intersects);
  };
  //console.log("beginning generation");
  var c;
  do {
    c = Circle.random(left, right, top, bottom);
    //console.log("--generating");
  } while(overlapsCircles(c));

  return c;
}

function line(circle) {
  return [circle.x,  circle.y + circle.r]
}


function randomChoice() {
  return Math.floor(Math.random() * (2 - 1 + 1)) + 1;
}

window.onload = function() {
  var paper = init_paper();
  var circle1 = new Circle(488, 33, 15, 10);
  drawCircle(paper, circle1, 0, function () {
    var y = circle1.y + circle1.r;
    var x = circle1.x;
    var line = paper.polyline(x, y, 
                           x, y + 20, 
                           x - 22, y + 40,
                           x - 22, y + 110,
                           x - 42, y + 130,
                           x - 42, y + 430,
                           x - 26, y + 450)
                    .attr({
                      stroke: "white"
                    });
    var len = line.getTotalLength();
    $('path[fill*="none"]').animate({
      'to': 1
    }, {
      duration: 5000,
      step: function(pos, fx) {
        var offset = len * fx.pos;
        var subpath = line.getSubpath(0, offset);
        //paper.clear();
        paper.path(subpath).attr({
          "stroke": "black",
          "stroke-width": circle1.s_w
        })
      },
    });
  });

  var circle2 = new Circle(448, 49, 10, 5);
  drawCircle(paper, circle2, 0, function () {
    var y = circle2.y + circle2.r;
    var x = circle2.x;
    var line = paper.polyline(x, y, 
                              x, y + 56,
                              x + 15, y + 70)
                    .attr({
                      stroke: "white"
                    });
    var len = line.getTotalLength();
    $('path[fill*="none"]').animate({
      'to': 1
    }, {
      duration: 2000,
      step: function(pos, fx) {
        var offset = len * fx.pos;
        var subpath = line.getSubpath(0, offset);
        //paper.clear();
        paper.path(subpath).attr({
          "stroke": "black",
          "stroke-width": circle2.s_w
        })
      },
    });
  });

  var circle3 = new Circle(422, 30, 7, 5);
  drawCircle(paper, circle3, 0, function () {
    var y = circle3.y + circle3.r;
    var x = circle3.x;
    var line = paper.polyline(x, y, 
                              x, y + 30,
                              x + 25, y + 50)
                    .attr({
                      stroke: "white"
                    });
    var len = line.getTotalLength();
    $('path[fill*="none"]').animate({
      'to': 1
    }, {
      duration: 2000,
      step: function(pos, fx) {
        var offset = len * fx.pos;
        var subpath = line.getSubpath(0, offset);
        //paper.clear();
        paper.path(subpath).attr({
          "stroke": "black",
          "stroke-width": circle3.s_w
        })
      },
    });
  });


  var circle4 = new Circle(419, 101, 7, 5);
  drawCircle(paper, circle4, 0, function () {
    var y = circle4.y + circle4.r;
    var x = circle4.x;
    var line = paper.polyline(x, y, 
                              x, y + 48,
                              x + 30, y + 77)
                    .attr({
                      stroke: "white"
                    });
    var len = line.getTotalLength();
    $('path[fill*="none"]').animate({
      'to': 1
    }, {
      duration: 2000,
      step: function(pos, fx) {
        var offset = len * fx.pos;
        var subpath = line.getSubpath(0, offset);
        //paper.clear();
        paper.path(subpath).attr({
          "stroke": "black",
          "stroke-width": circle4.s_w
        })
      },
    });
  });

  var circle5 = new Circle(438, 138, 6, 3);
  drawCircle(paper, circle5, 0, function () {
    var y = circle5.y + circle5.r;
    var x = circle5.x;
    var line = paper.polyline(x, y, 
                              x, y + 28,
                              x + 5, y + 35)
                    .attr({
                      stroke: "white"
                    });
    var len = line.getTotalLength();
    $('path[fill*="none"]').animate({
      'to': 1
    }, {
      duration: 2500,
      step: function(pos, fx) {
        var offset = len * fx.pos;
        var subpath = line.getSubpath(0, offset);
        //paper.clear();
        paper.path(subpath).attr({
          "stroke": "black",
          "stroke-width": circle5.s_w
        })
      },
    });
  });

  var circle6 = new Circle(408, 73, 6, 3);
  drawCircle(paper, circle6, 0, function () {
    var y = circle6.y + circle6.r;
    var x = circle6.x;
    var line = paper.polyline(x - 2, y - 2, 
                              x - 12, y + 9,
                              x - 12, y + 42,
                              x + 10, y + 62)
                    .attr({
                      stroke: "white"
                    });
    var len = line.getTotalLength();
    $('path[fill*="none"]').animate({
      'to': 1
    }, {
      duration: 2500,
      step: function(pos, fx) {
        var offset = len * fx.pos;
        var subpath = line.getSubpath(0, offset);
        //paper.clear();
        paper.path(subpath).attr({
          "stroke": "black",
          "stroke-width": circle6.s_w
        })
      },
    });
  });

  var circle7 = new Circle(390, 40, 6, 3);
  drawCircle(paper, circle7, 0, function () {
    var y = circle7.y + circle7.r;
    var x = circle7.x;
    var line = paper.polyline(x, y,
                              x, y + 70,
                              x + 4, y + 74)
                    .attr({
                      stroke: "white"
                    });
    var len = line.getTotalLength();
    $('path[fill*="none"]').animate({
      'to': 1
    }, {
      duration: 2500,
      step: function(pos, fx) {
        var offset = len * fx.pos;
        var subpath = line.getSubpath(0, offset);
        //paper.clear();
        paper.path(subpath).attr({
          "stroke": "black",
          "stroke-width": circle7.s_w
        })
      },
    });
  });

  var circle8 = new Circle(357, 62, 6, 3);
  drawCircle(paper, circle8, 0, function () {
    var y = circle8.y + circle8.r;
    var x = circle8.x;
    var line = paper.polyline(x + 5, y - 3,
                              x + 25, y + 20,
                              x + 25, y + 30,
                              x + 32, y + 38)
                    .attr({
                      stroke: "white"
                    });
    var len = line.getTotalLength();
    $('path[fill*="none"]').animate({
      'to': 1
    }, {
      duration: 2500,
      step: function(pos, fx) {
        var offset = len * fx.pos;
        var subpath = line.getSubpath(0, offset);
        //paper.clear();
        paper.path(subpath).attr({
          "stroke": "black",
          "stroke-width": circle8.s_w
        })
      },
    });
  });
}


