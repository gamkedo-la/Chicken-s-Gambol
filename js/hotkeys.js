const HotKeys = new (function() {

  this.update = function(delta) {
    if (Input.isPressed(KEY.U)) {
      DEBUG = !DEBUG;
    }

    if (Input.isPressed(KEY.PERIOD)) {
      Game.findIdleChicken();
    }

    if (Input.isPressed(KEY.DELETE)) {
      Game.deleteSelection();
    }

    if (Input.isPressed(KEY.ESC) && Game.hasActiveBuildButton()) {
      Game.cancelBuildButton();
    }

    if (Input.isDown(KEY.SHIFT) && Input.isPressed(KEY.ONE)) {
      Selection.addSelectionToHotkeyGroup(1);
    }

    if (Input.isDown(KEY.SHIFT) && Input.isPressed(KEY.TWO)) {
      Selection.addSelectionToHotkeyGroup(2);
    }

    if (Input.isDown(KEY.SHIFT) && Input.isPressed(KEY.THREE)) {
      Selection.addSelectionToHotkeyGroup(3);
    }

    if (Input.isDown(KEY.SHIFT) && Input.isPressed(KEY.FOUR)) {
      Selection.addSelectionToHotkeyGroup(4);
    }

    if (!Input.isDown(KEY.SHIFT) && Input.isPressed(KEY.ONE)) {
      Selection.selectHotKeyGroup(1);
    }

    if (!Input.isDown(KEY.SHIFT) && Input.isPressed(KEY.TWO)) {
      Selection.selectHotKeyGroup(2);
    }

    if (!Input.isDown(KEY.SHIFT) && Input.isPressed(KEY.THREE)) {
      Selection.selectHotKeyGroup(3);
    }

    if (!Input.isDown(KEY.SHIFT) && Input.isPressed(KEY.FOUR)) {
      Selection.selectHotKeyGroup(4);
    }
  };

})();
