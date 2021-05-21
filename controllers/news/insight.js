const { Insight,Category } = require('../../models/news/Insight');

exports.create = async (req,res) => {

	const { images,category,status} = req.body
	if(!images)
		return res.status(406).json({
		  success: false,
		  msg: "Images Cannot Be Empty",
		});	
	const insight =  await Insight.create({
		images:images,
		status:status,
		userId:req.user.id,
	});
	await insight.addCategory(category, { through: { selfGranted: false } });
	res.status(201).json({
	  success: true,
	  msg: "Insight created successfully.",
	});
	
}

exports.getAll = async(req,res) => {

	const insight = await Insight.findAll({
	  where: {
	    status: 'active'
	  },
	  order: [
	      ['createdAt', 'DESC'],
	     ] 
	});
	res.status(200).json({
	  data:insight,		
	  success: true
	});
}