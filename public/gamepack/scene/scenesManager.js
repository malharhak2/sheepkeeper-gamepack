define (["GameScene", "config"], function (GameScene, config) {
	var ScenesManager = function () {
		this.scenes = {};
		this.activeScene = new GameScene();
		this.nextScene = "";
	};

	ScenesManager.prototype.addScene = function (name, scene) {
		this.scenes[name] = scene;
		var self = this;
	};

	ScenesManager.prototype.changeScene = function (name, initCallback, loadCallback) {
		this.initCallback = initCallback;
		this.loadCallback = loadCallback;

		this.nextScene = name;

		if (config.debug) {
			console.log("Changing Scene : " + name);
		}
		var self = this;
		this.scenes[name]._changeScene = function (name) {
			self.changeScene (name, initCallback, loadCallback);
		};

		this.scenes[name]._init(function () {
			self.onInit();
		});
		this.scenes[name]._loadCallback = function () {
			self.onLoad();
		};
	};

	ScenesManager.prototype.onInit = function () {
		if (config.debug) {
			console.log ("Scene initialized : " + this.nextScene);
		}
		this.activeScene = this.scenes[this.nextScene];
		this.initCallback();
	};


	ScenesManager.prototype.onLoad = function () {
		var self = this;
		this.activeScene._start ( function () {
			if (config.debug) {
				console.log("scene started : " + self.nextScene);
			}
			self.loadCallback();
		})
	}

	return new ScenesManager();
});
