;(function(game) {
	//console.log(window.Game);
	var Asset = game.Asset = Hilo.Class.create({
		Mixes: Hilo.EventMixin,
		queue: null,
		sound: null,
		timeflag: null,
		dom: null,

		gameEnter: null,
		gameRules: null,
		gameScene: null,
		gamePause: null,
		gameRenew: null,
		gameOver: null,
		cutDown: null,
		appGrade: null,
		//预加载游戏所需要的资源
		load: function() {
			//资源列表
			var resource = [
				{id: 'cutDown', src: './images/cutDown_sprite.png'},
				{id:'enterGame', src:'./images/enterGame_sprite.png'},
				{id: 'gameRules', src: './images/gameRules_sprite.png'},
				{id: 'gameScene', src: './images/gameScene_sprite.png'},
				{id: 'gamePause', src: './images/gamePause_sprite.png'},
				{id: 'gameRenew', src: './images/gameRenew_sprite.png'},
				{id: 'gameOver', src: './images/wx_Grade_sprite.png'},
				{id: 'appGrade', src: './images/app_Grade_sprite.png'},
				{id: 'rankList', src:'./images/rankList_sprite.png'},
				{id:'btn_downLoad', src:'./images/btn_downLoad.png'},
				{id: 'btn_wshare',src: './images/btn_wshare.png'},
				{id: 'btn_playAgain',src: './images/btn_playAgain.png'},
				{id: 'btn_share',src: './images/btn_share.png'},
				{id: 'btn_view_rank',src: './images/btn_view_rank.png'},
				{id: 'playBtn', src: './images/playBtn.png'}
			//	{id: 'sprite', src: '../images/sprite.png'}
			];
			// var resource = [
			// 	{id: 'cutDown', src: './images/cutDown_sprite.png'},
			// 	{id:'enterGame', src:'./images/enterGame_sprite.png'},
			// 	{id: 'gameRules', src: './images/gameRules_sprite.png'},
			// 	{id: 'gameScene', src: './images/gameScene_sprite.png'},
			// 	{id: 'gamePause', src: './images/gamePause_sprite.png'},
			// 	{id: 'gameRenew', src: './images/gameRenew_sprite.png'},
			// 	{id: 'gameOver', src: './images/wx_Grade_sprite.png'},
			// 	{id: 'appGrade', src: './images/app_Grade_sprite.png'},
			// 	{id: 'rankList', src:'./images/rankList_sprite.png'},
			// 	{id:'btn_downLoad', src:'./images/btn_downLoad.png'},
			// 	{id: 'btn_wshare',src: './images/btn_wshare.png'},
			// 	{id: 'btn_playAgain',src: './images/btn_playAgain.png'},
			// 	{id: 'btn_share',src: './images/btn_share.png'},
			// 	{id: 'btn_view_rank',src: './images/btn_view_rank.png'},
			// 	{id: 'playBtn', src: './images/playBtn.png'}
			// //	{id: 'sprite', src: '../images/sprite.png'}
			// ];
			this.dom = document.getElementById('load-progress');
			//console.log(resource);
			//创建资源加载的队列
			this.queue = new Hilo.LoadQueue();
			this.queue.maxConnections = 4;
			this.queue.add(resource);
			//绑定资源加载完成后的处理事件
			this.queue.on('complete',this.onComplete.bind(this));
			//资源预加载启动
			this.queue.start();
			this.timeflag = window.setInterval(this.checkLoad.bind(this),10);
		},
		checkLoad: function() {
			var loaded = this.queue.getLoaded();
			// if(this.queue.getSize) console.log("资源的大小：" + this.queue.getSize(false));
			// else console.log("getSize方法失效");
			//console.log("已经加载的资源:"+loaded);
			var totalLoad = this.queue.getTotal();
			//console.log("需要加载的全部资源：" + totalLoad);
			var pixs = parseFloat(loaded/totalLoad * 100);
			//console.log(pixs);
			pixs = pixs.toFixed(2);
			this.dom.innerHTML = pixs + '%';
			if(pixs == 100.00) window.clearInterval(this.timeflag);
		},
		onComplete: function() {
			//再资源加载完成后获取相应的资源
			//this.background = this.queue.get('bg').content;
			//this.sprite = this.queue.get('sprite').content;

			//雪碧图数据接收
			this.gameEnter = this.queue.get('enterGame').content;
			this.gameRules = this.queue.get('gameRules').content;
			this.gameScene = this.queue.get('gameScene').content;
			this.gamePause = this.queue.get('gamePause').content;
			this.gameRenew = this.queue.get('gameRenew').content;
			this.gameOver = this.queue.get('gameOver').content;
			this.cutDown = this.queue.get('cutDown').content;
			this.appGrade = this.queue.get('appGrade').content;
			this.queue.off('complete');
			//window.clearInterval(this.flag);
			this.dom.style.display = 'none';
        		this.fire('complete');
		}
		
	});

})(window.Game);