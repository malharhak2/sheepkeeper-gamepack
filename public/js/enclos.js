define (["canvas", "Vector2", "imageManager", "graphics"], 
function (canvas, Vector2, imageManager, graphics) {
	var ctx = canvas.ctx;
	var enclosConf = {
    	x : 1,
    	w : 13,
    	y : 1,
    	h : 14,
    	caseSize : 44
    }
	var enclos = {
		x : enclosConf.x * enclosConf.caseSize,
		y : enclosConf.y * enclosConf.caseSize,
		w : enclosConf.w * enclosConf.caseSize,
		h : enclosConf.h * enclosConf.caseSize,
		center : {
			x : (enclosConf.x + (enclosConf.w / 2)) * enclosConf.caseSize,
			y : (enclosConf.y + (enclosConf.h / 2)) * enclosConf.caseSize
		},

		drawEnclosCase : function (x, y, angle) {
			graphics.renderObject ({
				position : new Vector2(x * enclosConf.caseSize, y * enclosConf.caseSize),
				pivot : new Vector2(22, 22),
				rotation : angle,
				image : "barriere",
				width : imageManager.get("barriere").width,
				height : imageManager.get("barriere").height,
				scale : 1
			});
		},

		render : function () {
			// On dessine les enclos en horiontal
			for (var i = enclosConf.x; i < enclosConf.x + enclosConf.w; i++) {
				this.drawEnclosCase(i, enclosConf.y, 0);
				this.drawEnclosCase(i, enclosConf.y + enclosConf.h - 1, 0);
			};
			// On dessine les enclos en vertical
			for (var j = enclosConf.y; j < enclosConf.y + enclosConf.h; j++) {
				this.drawEnclosCase(enclosConf.x, j, Math.PI / 2);
				this.drawEnclosCase(enclosConf.x + enclosConf.w - 1, j, Math.PI / 2);
			}
		}
	};

	return enclos;
});