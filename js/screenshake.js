const screenShake = new (function() {
  let screenShakeAmount = 0;
  let screenShakeAmountHalf = 0;

  this.shake = function(amount) {
    screenShakeAmountHalf = amount / 2;
    screenShakeAmount = amount;
  };

  this.draw = function(interpolationPercentage) {
    if (screenShakeAmount <= 0) {
      return;
    }
    if (screenShakeAmount < screenShakeAmountHalf) {
      screenShakeAmount *= 0.75;
    }
    else {
      screenShakeAmount *= 0.95;
    }

    gameContext.translate(Math.random() * screenShakeAmount - screenShakeAmount * 0.5, Math.random() * screenShakeAmount - screenShakeAmount * 0.5);

    if (screenShakeAmount <= 0.02) {
      screenShakeAmount = 0;
    }
  };
})();
