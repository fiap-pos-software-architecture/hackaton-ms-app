const ffmpeg = require("ffmpeg.js");
const fs = require("fs");
const testData = new Uint8Array(fs.readFileSync("teste.mp4"));
// Encode test video to VP8.
const result = ffmpeg({
  MEMFS: [{name: "teste.mp4", data: testData}],
  arguments: ["-i", "teste.mp4", "-c:v", "libvpx", "-an", "out.webm"],
});
// ffmpeg.Snapshot()
// Write out.webm to disk.
const out = result.MEMFS[0];
// console.log('out:', out)
fs.writeFileSync(`formatted-${out.name}`, new Buffer(out.data));