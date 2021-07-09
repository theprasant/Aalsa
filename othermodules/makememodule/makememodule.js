const pfppos = {
  hulk: {
    imgleft: 170,
    imgtop: 28
  },
  iron : {
    imgleft: 175,
    imgtop: 26
  }
}
const fs = require('fs');
const bannerFolders = fs.readdirSync('./assets/images/makemeimgs');
let bannerObj = {};

for (const folder of bannerFolders) {
  const bannerFiles = fs.readdirSync(`./assets/images/makemeimgs/${folder}`).filter(file => file.endsWith('.png'));
  for (const file of bannerFiles) {
    const banner = `./assets/images/makemeimgs/${folder}/${file}`;
    let newObj = {
      [file.replace(/\.png/,'')] : {
        name: file.replace(/\.png/,''),
        url: banner,
        imgleft: pfppos[file.replace(/\.png/,'')]?.imgleft || 170,
        imgtop: pfppos[file.replace(/\.png/,'')]?.imgtop || 30
      }
    }
    Object.assign(bannerObj, newObj)
  }
}

module.exports = bannerObj;

