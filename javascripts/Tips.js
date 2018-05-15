;(function(game){
	var Tips = game.Tips = Hilo.Class.create({
			Extends: Hilo.Container,
			constructor: function(properties) {
				Tips.superclass.constructor.call(this, properties);
				this.initTips(properties);
			},
		gameTips: null,
		gameRulesContent: null,
		initTips:function(properties) {
			this.gameTips = new Hilo.Bitmap({
				id: 'gameRules',
				x: game.width/8,
				width: game.width/8*7,
				y: game.height/7,
				rect: properties.rect,
				image: properties.image,
				scaleX: 0.5,
				scaleY: 0.5
				//rect: properties.rect
			});
			this.gameRulesContent = new Hilo.Bitmap({
				id: 'gameRulesContent',
				width: game.width/8*7,
				x: game.width/8 + this.gameTips.width/20,
				y: game.height/7 + this.gameTips.height/8,
				rect: [734, 679,444,448],
				image: properties.image,
				scaleX: 0.5,
				scaleY: 0.5
			});
			//var startBtn = 
			this.addChild(this.gameTips,this.gameRulesContent);

		},
		addGameChar: function(properties) {
		}
	});
})(window.Game);