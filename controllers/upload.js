const Media = require('../models/Media');

exports.upload = async (req,res) => {

	let url;
	if(req.file)
		 url = `${process.env.UPLOAD_URL}${req.file.fieldname}s/${req.file.filename}`
	const image = await Media.create({
		path:url,
		userId:req.user.id,
		type: req.file.fieldname
	});	
	res.status(201).json({
	  data: image.id,
	  success: true,
	  msg: "Upload successfully.",
	});
}

exports.uploads = async(req,res) =>  {
	let media = [];
	let data = [];
	if(req.files)
		req.files.forEach((file)=>{
			const url = `${process.env.UPLOAD_URL}${file.fieldname}s/${file.filename}`
			var set =
			{
				'path':url,
				'userId':req.user.id,
				'type': file.fieldname
			}
			data.push(set);
		})
	
	const medias = await Media.bulkCreate(data);
	medias.forEach((e)=>{
		media.push(e.id)
	})
	res.status(201).json({
	  data: media,
	  success: true,
	  msg: "Upload successfully.",
	});
}