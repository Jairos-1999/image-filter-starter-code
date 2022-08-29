import fs from "fs";
import Jimp = require("jimp");

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const photo = await Jimp.read(inputURL);
      const outpath =
        "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname + outpath, (img) => {
          resolve(__dirname + outpath);
        });
    } catch (error) {
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(filesPath: Array<string>) {
  try {
    const { dirname } = require('path');
    const { constants, promises: { access } } = require('fs');
    let rootPath:string = '' 
    for (let path of module.paths) {
        await access(path, constants.F_OK);
        rootPath =  dirname(path);
    }

    for (let filePath of filesPath) {
      if (fs.existsSync(filePath)) {
        const temp = 'src\\util\\tmp\\'
        const frags = filePath.split('/')
        const file = frags[(frags.length - 1)];
        const path = `${rootPath}\\${temp}\\${file}`
        fs.unlinkSync(path);
      }
    }
  } catch(err) {}
}