const fs = require('fs');
const path = require('path').resolve('./');

const generateImage = () => {
  const defaultImageBuffer = fs.readFileSync(
    `${path}/public/assets/images/default.jpeg`,
  );

  const ext = '.jpeg';
  const fileName = `${Math.random()
    .toString(36)
    .substring(2, 15)}${Math.random().toString(36).substring(2, 15)}${ext}`;

  fs.writeFileSync(
    `${path}/storage/uploads/static/${fileName}`,
    defaultImageBuffer,
  );
  return fileName;
};

module.exports = generateImage;
