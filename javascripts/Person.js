;(function(game) {
	var Person = game.Person = new Hilo.Class.create({
		Extends: Hilo.Container,
		constructor: function(properties) {
			Person.superclass.constructor.call(this,properties);
			this.init(properties);
		},
		init: function(properties) {
			var person = new Hilo.Bitmap({
				id: 'personChild',
				image: properties.image,
				rect: [285, 0,270,332],
				scaleX: 0.5,
				scaleY: 0.5
			});
			person.x = (game.width - person.width*person.scaleX)/2;
			person.y = game.height/12*7;
			this.addChild(person);
		}
	});
})(window.Game);