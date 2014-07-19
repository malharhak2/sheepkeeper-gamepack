define (["canvas", "imageManager", "config", "gameManager"], 
function (canvas, imageManager, config, gameManager) {
		

	var sign = {
		width : 440,
		height :479,
		padding : {
			left : 20,
			top : 70
		},
		lineHeight : 40,
		font : "32px Helvetica",
		position : {
			x : config.worldSize.x / 2 - 440 / 2,
			y : config.worldSize.y - 479 / 2
		}
	};

	sign.render = function () {
		var ctx = canvas.ctx;
		ctx.drawImage(imageManager.get("sign"), this.position.x, this.position.y);
		ctx.font = this.font;
		ctx.strokeStyle = "#000";
		ctx.fillStyle = "#000";
		var gameTxt = [
			"Touch the sheeps",
			"To keep them inside !",
			"Score : " + gameManager.score
		];
		var lostTxt = [
			"You lost :(",
			"Score : " + gameManager.score
		];

		var txts = gameManager.lost ? lostTxt : gameTxt;
		for (var i = 0; i < txts.length; i++) {
			ctx.fillText(txts[i], this.centerText(txts[i]), this.position.y + this.padding.top + this.lineHeight * i);
		};
		if (gameManager.lost) {
			ctx.drawImage(imageManager.get("replay"), this.position.x + 85, this.position.y + 130);
		}
	};

	sign.centerText = function (txt) {
		var ctx = canvas.ctx;
		var center = this.position.x + (this.width / 2);
		var size = ctx.measureText(txt);
		return center - size.width / 2;
	}
	return sign;
});