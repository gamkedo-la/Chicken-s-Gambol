// add file paths to the array, they will be looped through for decompression, which makes them web audio api usable
var array_of_compressed_audio_files_from_audio_tags = [];

//grabs the url, sets the 'try/catch' callbacks, responseType set to arraybuffer to function in the Web Audio API properly
function loadFile(audio_tag, callback) {
    //add code to grab audio data from the audio tags
}

function decompress_audio_data() {
  let audio_tag_compressed_audio_data = this.response;//response from loadFile
  audioCtx.decodeAudioData(audio_tag_compressed_audio_data, (decompressed_audio_data) => {
    arrayOfDecompressedAudioFiles.push(decompressed_audio_data);
  });
}

function loadAudioFiles() {
  for (let compressed_audio_file_index = 0; compressed_audio_file_index < array_of_compressed_audio_files_from_audio_tags.length; compressed_audio_file_index++) {
    loadFile(array_of_compressed_audio_files_from_audio_tags[compressed_audio_file_index], decompress_audio_data);
  }
}

loadAudioFiles();

//audio data needs to be decompressed to function in the web audio api
var arrayOfDecompressedAudioFiles = [];
