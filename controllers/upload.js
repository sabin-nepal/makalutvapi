const Media = require('../models/Media');

exports.upload = async (req,res) => {

	let url;
	console.log(req.files.fieldname)
	if(req.files)
		 url = `${process.env.UPLOAD_URL}${req.files.fieldname}s/${req.files.filename}`	
	const media = await Media.create({
		path:url,
		userId:req.user.id,
		type: req.files.fieldname
	});	
	res.status(201).json({
	  data: media.id,
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