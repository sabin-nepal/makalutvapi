const Media = require('../models/Media');
const fs = require('fs');
const sharp = require('sharp')

exports.upload = async(req,res) =>  {
	let media = [];
	let data = [];
	let fieldname;
	let filename;
	if(req.files)
		req.files.forEach(async(file)=>{
			if(file.mimetype=="video/mp4"){
				fieldname = 'videos';
			}
			else{
				fieldname = 'thumbnails';
				filename = file.filename;
				if(file.mimetype === 'image/jpeg'){
					try{
						filename = '300X300-' + filename;
						await sharp(file.path).resize(300,300, {
							fit: sharp.fit.inside,
    						withoutEnlargement: true,}).jpeg({ quality: 90 }).toFile('public/uploads/thumbnails/' + filename);
					}catch(error){
						console.log(error);
					}
				}
				if(file.mimetype === 'image/png'){
					try{
						filename = '300X300-' + filename;
						await sharp(file.path).resize(300,300, {
							fit: sharp.fit.inside,
    						withoutEnlargement: true,}).png({ quality: 90 }).toFile('public/uploads/thumbnails/' + filename);
					}catch(error){
						console.log(error);
					}
				}
			}
			const url = `${process.env.UPLOAD_URL}${fieldname}/${filename}`
			var set =
			{
				'path':url,
				'userId':req.user.id,
				'type': fieldname.slice(0, -1)
			}
			data.push(set);
		})
	setTimeout(async()=>{
		const medias = await Media.bulkCreate(data);
		medias.forEach((e)=>{
			media.push(e.id)
		})
		res.status(201).json({
		  data: media,
		  success: true,
		  msg: "Upload successfully.",
		});
	},1000);
	
}