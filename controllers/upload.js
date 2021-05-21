exports.upload = async (req,res) => {

	let url;
	if(req.file)
		 url = `${process.env.UPLOAD_URL}${req.file.fieldname}s/${req.file.filename}`
	res.status(201).json({
	  data:url,
	  success: true,
	  msg: "Upload successfully.",
	});
}

exports.uploads = async(req,res) =>  {
	let urls = [];
	if(req.files)
		req.files.forEach((file)=>{
			const data = `${process.env.UPLOAD_URL}${file.fieldname}s/${file.filename}`
			urls.push(data);
		})
	
	res.status(201).json({
	  data:urls,
	  success: true,
	  msg: "Upload successfully.",
	});
}