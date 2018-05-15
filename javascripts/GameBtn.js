;(function(game) {
	var gameBtn = game.GameBtn = new Hilo.Class.create({
		Extends: Hilo.Container,
		constructor: function(properties) {
			gameBtn.superclass.constructor.call(this, properties);
			this.init();
		},
		init: function(properties) {
			var left_btn = new Hilo.Bitmap({
				id: 'runBtn_left',
				image: game.asset.gameScene,
				rect: [0, 446,180,120],
				scaleX: game.scaleX,
				scaleY: game.scaleY
			});
			var right_btn = new Hilo.Bitmap({
				id: 'runBtn_right',
				image: game.asset.gameScene,
				rect: [570, 270,180,120],
				scaleX: game.scaleX,
				scaleY: game.scaleY
			});
			left_btn.x = (game.width - (left_btn.width * 2 + left_btn.width)*left_btn.scaleX)/2;
			right_btn.x = left_btn.x + left_btn.width*2*left_btn.scaleX;
			left_btn.y = right_btn.y = this.width/8;
			this.addChild(left_btn,right_btn);
			right_btn.on(Hilo.event.POINTER_START, function() {
				game.gamestep();
			});
			left_btn.on(Hilo.event.POINTER_START, function() {
				game.gamestep();
			});
		}
	});
})(window.Game);