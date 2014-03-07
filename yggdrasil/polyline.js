function Polyline(start_x, start_y, end_x, end_y) 
{
	this.start_x = start_x; this.start_y = start_y;
	this.end_x = end_x; this.end_y = end_y;
	this.intermediate_pts = [];	
}

Polyline.prototype.generate = function (circles, bends) {
	
}