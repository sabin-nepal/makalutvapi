const { Video,Category } = require('../../models/news/Video');

exports.create = async (req,res) => {

	const { title,url,category } = req.body

	if(!title || !url)
		return res.status(406).json({
		  success: false,
		  msg: "Title or video cannot be empty.",
		});
	const video =  await Video.create({
		title:title,
		video:url,
		userId:req.user.id,
	});
	await video.addCategory(category, { through: { selfGranted: false } });
	res.status(201).json({
	  success: true,
	  msg: "News created successfully.",
	});
}
