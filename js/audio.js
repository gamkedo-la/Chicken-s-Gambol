let idleChickenSound1 = new Audio();
let idleChickenSound2 = new Audio();
let idleChickenSound3 = new Audio();

let arrayOfIdleChicken1Sounds = new Array();
let arrayOfIdleChicken2Sounds = new Array();
let arrayOfIdleChicken3Sounds = new Array();

arrayOfIdleChickenSounds1 = ["audio/chicken_idle/chicken_cup_1.mp3", "audio/chicken_idle/chicken_cup_2.mp3", "audio/chicken_idle/chicken_cup_3.mp3"];
arrayOfIdleChickenSounds2 = ["audio/chicken_idle/chicken_cup_4.mp3", "audio/chicken_idle/chicken_cup_5.mp3", "audio/chicken_idle/chicken_cup_7.mp3"];
arrayOfIdleChickenSounds3 = ["audio/chicken_idle/chicken_cup_8.mp3", "audio/chicken_idle/chicken_cup_9.mp3"];

function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

function assignIdleChickenSound(arrayOfIdleChickenSounds) {
  let length = arrayOfIdleChickenSounds.length;
  let randomIdleChickenSoundsIndex = randomInt(0, length - 1);
  return arrayOfIdleChickenSounds[randomIdleChickenSoundsIndex];
}

idleChickenSound1.src = assignIdleChickenSound(arrayOfIdleChickenSounds1);
idleChickenSound1.autoplay = true;
idleChickenSound1.loop = true;
idleChickenSound1.onended = assignIdleChickenSound(arrayOfIdleChickenSounds1);

idleChickenSound2.src = assignIdleChickenSound(arrayOfIdleChickenSounds2);
idleChickenSound2.autoplay = true;
idleChickenSound2.loop = true;
idleChickenSound2.onended = assignIdleChickenSound(arrayOfIdleChickenSounds2);

idleChickenSound3.src = assignIdleChickenSound(arrayOfIdleChickenSounds3);
idleChickenSound3.autoplay = true;
idleChickenSound3.loop = true;
idleChickenSound3.onended = assignIdleChickenSound(arrayOfIdleChickenSounds3);

var pig_select_sound = new Audio();
pig_select_sound.src = "audio/pig_select_sound.mp3";
