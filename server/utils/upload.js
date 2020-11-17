const multer = require('multer');
const path = require('path');

const upload = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'files'),
    filename: (req, file, callback) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);

      callback(null, `${name.replace(/\s/g, '')}-${Date.now()}${ext}`);
    },
  }),
};

module.exports = upload;
