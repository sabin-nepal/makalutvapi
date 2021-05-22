const Adv = require('../models/Adv');

exports.create = async (req,res) => {

	const { title,image,startDate,endDate,status} = req.body
	if(!startDate || !endDate)
		return res.status(406).json({
		  success: false,
		  msg: "StartDate And EndDate Cannot Be Empty",
		});	
	const adv =  await Adv.create({
		title:title,
		image:image,
		status:status,
		userId:req.user.id,
	});
	await insight.addCategory(category, { through: { selfGranted: false } });
	res.status(201).json({
	  success: true,
	  msg: "Insight created successfully.",
	});
	
}