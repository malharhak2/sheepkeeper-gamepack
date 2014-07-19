define(["GameScene", "canvas", "config", "menuImages", "assetsManager",
	"imageManager", "inputs"], 
function (GameScene, canvas, config, menuImages, assetsManager, 
	imageManager, inputs) {
	
	var menuScene = new GameScene ("menu");

	menuScene.init = function (callback) {
		imageManager.pushImages(menuImages);
		callback();
	};

	menuScene.loading = function () {
		if (assetsManager.isLoaded()) {
			this._loadCallback();
		}
	};
	menuScene.inputs = function () {
		if (inputs.mouse.buttons.left.pressed) {
			this._changeScene("game");
		}
	};

	menuScene.start = function (callback) {
		callback();
	};
	
	menuScene.render = function () {
		canvas.ctx.drawImage(imageManager.get("splashscreen"), 0, 0);
		canvas.ctx.fillStyle = "black";

	};

	return menuScene;
});