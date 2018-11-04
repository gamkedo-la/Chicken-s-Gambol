// a simple particle system designed for FOOTSTEPS

let decalPositions = [];
const decalMax = 256;
const groundDecalFadePerMS = 0.05;

function addGroundDecal(pos,decalImage) {

    if (!pos || !decalImage) { return; }

    //console.log("addGroundDecal " + pos.x + "," + pos.y);

    pos.alpha = 1;
    pos.img = decalImage;
    decalPositions.push(pos);

    if (decalMax <= decalPositions.length) {
      decalPositions.shift();
    }
}

function updateGroundDecals(delta) {
    //console.log("updateGroundDecals");

    if (!decalPositions) {
        return;
    }
    let length = decalPositions.length;
    for (let i=0; i < length; i++) {
        decalPositions[i].alpha -= (delta * groundDecalFadePerMS); // fade out
    }
}

function drawGroundDecals() {

    //console.log("drawing all " + decalPositions.length + " ground decals!");
    if (!decalPositions) {
        return;
    }

      let length = decalPositions.length;
      for (let i = 0; i < length; i++) {
        if (decalPositions[i].alpha > 0) {
            drawImageRotatedAlpha(gameContext, decalPositions[i].img, decalPositions[i].x, decalPositions[i].y, decalPositions[i].angle, decalPositions[i].alpha);
        }
      }
}

