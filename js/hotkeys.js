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

    let selection = Selection.getSelection();
    if (selection.length === 1 && selection[0].constructor === Barracks && selection[0].isComplete()) {
      if (Input.isPressed(KEY.C)) {
        selection[0].queueUnit(Chicken);
      }
      else if (Input.isPressed(KEY.G)) {
        selection[0].queueUnit(Goblin);
      }
      else if (Input.isPressed(KEY.P)) {
        selection[0].queueUnit(Pig);
      }
    }
    else if (Selection.hasOnlySelected(Chicken)) {
      if (Input.isPressed(KEY.H)) {
        Game.buildHouse();
      }
      else if (Input.isPressed(KEY.M)) {
        Game.buildMudPit();
      }
      else if (Input.isPressed(KEY.B)) {
        Game.buildBarracks();
      }
    }

    if (Input.isDown(KEY.SHIFT)) {
      if (Input.isPressed(KEY.ONE)) {
        Selection.addSelectionToHotkeyGroup(1);
      }

      if (Input.isPressed(KEY.TWO)) {
        Selection.addSelectionToHotkeyGroup(2);
      }

      if (Input.isPressed(KEY.THREE)) {
        Selection.addSelectionToHotkeyGroup(3);
      }

      if (Input.isPressed(KEY.FOUR)) {
        Selection.addSelectionToHotkeyGroup(4);
      }
    }
    else {
      if (Input.isPressed(KEY.ONE)) {
        Selection.selectHotKeyGroup(1);
      }

      if (Input.isPressed(KEY.TWO)) {
        Selection.selectHotKeyGroup(2);
      }

      if (Input.isPressed(KEY.THREE)) {
        Selection.selectHotKeyGroup(3);
      }

      if (Input.isPressed(KEY.FOUR)) {
        Selection.selectHotKeyGroup(4);
      }
    }
  };

})();
