var multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./public/uploads/${file.fieldname}s`)
  },
  filename: function (req, file, cb) {
    cb(null,  Date.now() + '-' + path.basename(file.originalname))
  }
})
 

//image uploading
const filter = (req,file,cb) => {
	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
		cb(null,true)
	}
	else{
		cb(new Error('Unsupported files'),false)
	}
}

const imageUpload = multer({
	storage: storage,
	limits:  {
		fileSize: 1024*1024*10
	},
	fileFilter: filter
})


//video uploading

 

const videoFilter = (req,file,cb) => {
	if(file.mimetype === 'video/mp4'){
		cb(null,true)
	}
	else{
		cb(new Error('Unsupported files'),false)
	}
}

const videoUpload = multer({
	storage: storage,
	limits:  {
		fileSize: 1024*1024*10
	},
	fileFilter: videoFilter
})


exports.imageUpload = imageUpload;
exports.videoUpload = videoUpload;