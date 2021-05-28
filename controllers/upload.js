const Media = require('../models/Media');

exports.upload = async (req,res) => {

	let url;
	if(req.file)
		 url = `${process.env.UPLOAD_URL}${req.file.fieldname}s/${req.file.filename}`
	const image = await Media.create({
		image:url,
		userId:req.user.id,
	});	
	res.status(201).json({
	  data: image.id,
	  success: true,
	  msg: "Upload successfully.",
	});
}

exports.uploads = async(req,res) =>  {
	let image = [];
	let data = [];
	if(req.files)
		req.files.forEach((file)=>{
			const url = `${process.env.UPLOAD_URL}${file.fieldname}s/${file.filename}`
			var set =
			{
				'image':url,
				'userId':req.user.id,
			}
			data.push(set);
		})
	
	const images = await Media.bulkCreate(data);
	images.forEach((e)=>{
		image.push(e.id)
	})
	res.status(201).json({
	  data: image,
	  success: true,
	  msg: "Upload successfully.",
	});
}