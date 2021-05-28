const Adv = require('../models/Adv');
const category = require('../models/Category')
exports.create = async (req,res) => {

	const { title,image,startDate,endDate,status} = req.body
	if(!startDate || !endDate)
		return res.status(406).json({
		  success: false,
		  msg: "StartDate And EndDate Cannot Be Empty",
		});	
	const adv =  await Adv.create({
		title:title,
		mediumId:image,
		status:status,
		userId:req.user.id,
	});
	res.status(201).json({
	  success: true,
	  msg: "Advertsiment created successfully.",
	});
	
}