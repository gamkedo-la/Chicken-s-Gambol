const House = function(settings) {

  settings = extend(settings, {
    sprite: Sprites.house,
    clickRadius: 40
  });

  Unit.call(this, settings);
};
