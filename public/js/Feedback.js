define (["canvas", "time", "config"], function (canvas, time, config) {

	var Feedback = function (type, args) {
		this.type = type;
		this.position = args.position;
		this.start = time.time;

		this.radius = config.feedback.minRadius;
		this.step = (config.feedback.maxRadius - this.radius) / config.feedback.duration;
	};

	Feedback.prototype.update = function () {
		this.radius += this.step * time.deltaTime;
		if (time.time - this.start > config.feedback.duration) return false;
		return true;
	};

	Feedback.prototype.render = function () {
		var ctx = canvas.ctx;
		ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
		ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	};
	return Feedback;
});