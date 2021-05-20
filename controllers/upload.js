exports.upload = async (req,res) => {

	let ul;
	console.log(req.file)
	if(req.file)
		 url = `${process.env.UPLOAD_URL}${req.file.fieldname}s/${req.file.filename}`
	res.status(201).json({
	  data:url,
	  success: true,
	  msg: "Upload successfully.",
	});
}
