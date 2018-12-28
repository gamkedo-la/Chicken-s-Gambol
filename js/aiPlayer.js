const AIPlayer = new (function() {
	
	let elapsedSinceUpdate = 0;
	const updateInterval = 0.05;
	
	this.update = function (delta){
		elapsedSinceUpdate += delta;
		if (updateInterval <= elapsedSinceUpdate) {
			
		}
	};

})();	