;(function(game) {
	var overScene = game.OverScene = new Hilo.Class.create({
		Extends: Hilo.Container,
		constructor: function(properties) {
			overScene.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			//console.log(properties);
			var overTips = new Hilo.Bitmap({
				id: 'overTips',
				image: game.asset.gameOver,
				rect: [0, 0,556,606],
				scaleX: 0.55,
				scaleY: 0.55
			});
			
			var shareBtn = null;
			var downLoadBtn = null;
			if(game.configs.uid) {
				shareBtn = new Hilo.Bitmap({
					id: 'shareBtn',
					image: game.asset.appGrade,
					rect: [571, 249,204,62],
					scaleX: 0.5,
					scaleY: 0.5
				});
				shareBtn.on('touchstart',function() {
					//console.log(game.overScene);
					//console.log('test');
					game.stage.removeChild(game.OverScene);
					//$('.rank-container').show();
				});
				downLoadBtn = new Hilo.Bitmap({
					id: 'viewRankListBtn',
					image: game.asset.appGrade,
					rect: [571, 0,422,68],
					scaleX: 0.5,
					scaleY: 0.5
				});
			} else  {
				shareBtn = new Hilo.Bitmap({
					id: 'shareBtn',
					image: game.asset.gameOver,
					rect: [571, 249,204,62],
					scaleX: 0.5,
					scaleY: 0.5
				});

				downLoadBtn = new Hilo.Bitmap({
					id: 'viewRankListBtn',
					image: game.asset.gameOver,
					rect: [571, 0,422,68],
					scaleX: 0.5,
					scaleY: 0.5
				});
			}
			var playAgainBtn = new Hilo.Bitmap({
				id: 'playAgainBtn',
				image: game.asset.gameOver,
				rect: [571, 403,204,62],
				scaleX: 0.5,
				scaleY: 0.5
			});
			var overBaseBtn = new Hilo.Bitmap({
				id: 'overBaseBtn',
				image: game.asset.gameOver,
				rect: [571, 166,418,68],
				scaleX: 0.5,
				scaleY: 0.5
			});
			var showText = new Hilo.Text({
				width: this.width*0.4,
				text: '恭喜你，你的成绩是',
				scaleX: 1.8,
				scaleY: 1.8,
				textAlign: 'center',
				y: overTips.y
			});

			var GradeTime = new Hilo.Text({
				id: 'GradeTime',
				text: properties.Grade.score + '秒',
				color: '#d34',
				scaleX: 3,
				scaleY: 3,
				width: this.width/4,
				textAlign: 'center'
			});
			var rankText = new Hilo.Text({
				id: 'rankText',
				text: '本次排名'+ properties.Grade.cur_rank +'名',
				width: this.width/3,
				scaleX: 1.8,
				scaleY: 1.8,
				textAlign: 'center'
			});
			var historyRank = new Hilo.Text({
				id: 'historyRank',
				text: '历史最好排名'+ properties.Grade.best_rank +'名',
				width: this.width/3,
				scaleX: 1.5,
				scaleY: 1.5,
				textAlign: 'center'
			});

			var overRank = new Hilo.Text({
				id: 'overRank',
				text: '打败了'+properties.Grade.beat+'%的参赛者',
				width: this.width/3,
				scaleX: 1.8,
				scaleY: 1.8,
				textAlign: 'center'
			});
			var coinText = new Hilo.Text({
				id: 'coinText',
				text: '奖励' + properties.Grade.coin + '个奥运币',
				width: this.width/3,
				scaleX: 1.5,
				scaleY: 1.5,
				textAlign: 'center'
			});
			GradeTime.x = (this.width - GradeTime.width*GradeTime.scaleX)/2;
			GradeTime.y = this.height/3 + 15;
			rankText.x = (this.width - rankText.width*rankText.scaleX)/2;
			rankText.y = GradeTime.y + 45;
			historyRank.x = (this.width - historyRank.width*historyRank.scaleX)/2;
			historyRank.y = rankText.y + 32;
			overRank.x = rankText.x;
			overRank.y = historyRank.y + 30;
			coinText.x =  (this.width - coinText.width*coinText.scaleX)/2;
			coinText.y = overRank.y + 32;
			overTips.x = (game.width - overTips.width*overTips.scaleX)/2;
			overTips.y = game.height/5;
			showText.x =  overTips.x;
			showText.y = overTips.y + overTips.height*overTips.scaleY/5;
			downLoadBtn.x  =  (game.width - downLoadBtn.width*downLoadBtn.scaleX)/2;
			downLoadBtn.y = overTips.y + overTips.height*overTips.scaleY/5*4;
			overBaseBtn.x = (game.width - overBaseBtn.width*overBaseBtn.scaleX)/2;
			overBaseBtn.y = overTips.y + overTips.height*overTips.scaleY - overBaseBtn.height* overBaseBtn.scaleY/3*2;
			shareBtn.x = overBaseBtn.x +1;
			shareBtn.y = overBaseBtn.y + 2;
			playAgainBtn.x = shareBtn.x + shareBtn.width*shareBtn.scaleX + 2;
			playAgainBtn.y = shareBtn.y;
			this.addChild(overTips,downLoadBtn,overBaseBtn,shareBtn,playAgainBtn,showText,GradeTime,rankText,historyRank,overRank,coinText);
			playAgainBtn.on('touchstart', function() {
				game.stage.removeChild(game.overScene);
				game.playAgain();
			});
		}
	});

	function showRank() {
		
	}
})(window.Game);

