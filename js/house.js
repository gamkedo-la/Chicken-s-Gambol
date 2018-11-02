const House = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.house,
    clickRadius: 16,
    unitRanksSpacing: 36,
    speed: 1.4
  });

  Unit.call(this, settings);
};