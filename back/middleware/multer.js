const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDirectory = path.resolve(__dirname, '../documents/saleImages/');
console.log(`Upload directory resolved to: ${uploadDirectory}`);
if (!fs.existsSync(uploadDirectory)) {
    console.log('Upload directory does not exist, creating...');
    fs.mkdirSync(uploadDirectory, { recursive: true });
    console.log('Upload directory created.');
} else {
    console.log('Upload directory already exists.');
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;