const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/");
	},

	filename: function (req, file, cb) {
		const imgName = file.originalname;
		cb(null, imgName);
	},
});

const upload = multer({
	storage: storage,
});

module.exports = upload;
