define([], function () {
  var config = {
    startScene : "menu",
    worldSize : {
    	x : 640,
    	y : 888
    },
    enclos : {
    	x : 1,
    	 w : 13,
    	y : 1,
    	h : 14,
    	caseSize : 44
    },
    sheeps : {
    	speed : 30,
    	spawnTimer : 2.5,
    	dirInterval : [0.1, 1],
    	initialCount : 5,
    	scale : 1.15,
    },
    caseSize : 44,
    sifflet : {
    	radius : 70,
    	timer : 0.5
    },

    feedback : {
    	duration : 0.5,
    	minRadius : 1,
    	maxRadius : 35
    }
  };
  if (config.debug) {
    window.config = config;
  }
  return config;
});
