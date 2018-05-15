;(function(game) {
	var enterScene = game.EnterScene = Hilo.Class.create({
		Extends: Hilo.Container,
		constructor: function(properties) {
			enterScene.superclass.constructor.call(this,properties);
			this.init();
		},
		init: function(properties) {
			var background = new Hilo.Bitmap({
				id: 'enterbackground',
				image: game.asset.gameEnter,
				rect: [0,0,720,1166],
				//width: 1440
				scaleX: game.scaleX,
				scaleY: game.scaleY,
				x: 0,
				y: 0
			});
			// background.width *= 2;
			// background.height *= 2;
			// background.scaleX /= 2;
			// background.scaleY /=2;
			//console.log(game);
			//进入按钮的设定
			var enterBtn = new Hilo.Bitmap({
				id: 'enterBtn',
				image: game.asset.gameEnter,
				rect: [735, 0,318,100],
				// // height: bgHeight,
				 y: game.stage.height/5*4,
				scaleX: game.scaleX,
				scaleY: game.scaleY
			});
			var viewRankBtn = new Hilo.Text({
				id: 'viewRankBtn',
				text: '查看排行榜',
				width: this.width/4,
				textAlign: 'center',
				color: '#fff',
				scaleX:1.8,
				scaleY:1.8
			});
			// enterBtn.width *= 2;
			// enterBtn.height *= 2;
			//console.log(enterBtn);
			// var enterBtnContainer = new Hilo.Container({
			// 	id: 'enterBtnContainer',
			// 	 y: game.height/5*4
			// });
			//enterBtn.addChild(enterBtn);
			this.addChild(background,enterBtn);
			enterBtn.x = (game.width - enterBtn.width * enterBtn.scaleX)/2;
			viewRankBtn.x = (game.width - viewRankBtn.width * viewRankBtn.scaleX)/2;
			viewRankBtn.y = enterBtn.y + enterBtn.height*1.5*enterBtn.scaleY;
			//绑定进入按钮的事件
			enterBtn.on('touchstart',function(e) {
				Game.stage.removeChild(game.enterScene);
				Game.gameReady();
				//console.log("正在点击图片");
			});
			viewRankBtn.on('touchstart', function() {
				$('.rank-container').show();
				//var url = 'http://active.app.doubimeizhi.com/olympic/v1/game/rank/report';
				var url = 'http://active.app.doubimeizhi.com/olympic/v1/game/rank/top';
				url += '?' + getString(game.configs,salt);
				//console.log(salt);
				var tpl =  "<li class='rank-item'>"
							+ "<span class='name'>$rank   $name</span>"
							+ "<span class='time'>$time秒</span>"
						+ "</li>";
				var tplActive =  "<li class='rank-item active'>"
							+ "<span class='name'>$rank   $name</span>"
							+ "<span class='time'>$time秒</span>"
						+ "</li>";
				$.ajax({
					url: url,
					type: 'GET',
					dataType: 'json',
					success: function(data) {
						//console.log(data);
						var html = '';
						var personRank  = data.myrank.rank;
						var topData = data.top;
						for(var i = 0, len = topData.length; i < len ; i++) {
							if(topData[i].rank == personRank) {
								html += tplActive.replace(/\$rank/g, 'NO.' + topData[i].rank).replace(/\$name/g, topData[i].nick_name).replace(/\$time/g,topData[i].score);
							} else {
								html += tpl.replace(/\$rank/g, 'NO.' + topData[i].rank).replace(/\$name/g, topData[i].nick_name).replace(/\$time/g,topData[i].score);
							}
						}
						if(personRank > 10) {
							html += tplActive.replace(/\$rank/g, 'NO.' + data.myrank.rank).replace(/\$name/g, data.myrank.nick_name).replace(/\$time/g,data.myrank.score);
						}
						$('.rank-list').html(html);
						$('.rank-dialog').show();
					}
				});
			});
		}
	});
})(window.Game);