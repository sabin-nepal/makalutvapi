const Media = require('../models/Media');


exports.upload = async(req,res) =>  {
	let media = [];
	let data = [];
	let fieldname;
	if(req.files)
		req.files.forEach((file)=>{
			if(file.mimetype=="video/mp4")
				fieldname = 'video';
			else
				fieldname = 'thumbnail';
			const url = `${process.env.UPLOAD_URL}${fieldname}s/${file.filename}`
			var set =
			{
				'path':url,
				'userId':req.user.id,
				'type': fieldname
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