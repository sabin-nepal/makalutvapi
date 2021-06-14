const { News,Category } = require('../models/news/News');
const Media = require('../models/Media')
const PollResult = require('../models/news/PollResult')

exports.create = async (req,res) => {

	const { title,media,type="news" } = req.body

	if(!title)
		return res.status(406).json({
		  success:false,
		  msg: "Title cannot be empty.",
		});
	await Category.create({
	    title:title,
	    mediumId:media,
	    userId:req.user.id,
	    type:type,
	  });
	res.status(201).json({
	  success: true,
	  msg: "Category Created successfully.",
	});
	
}

exports.getAllNews = async (req,res) => {
	const category = await Category.findAll({
		include:[
	  	{
	  	 model: Media,
	  	 attributes: ['id','path'],
	  	},
	  	{
	  		model: News,
	  		include:[{
	  			model: Media,
	  			attributes: ['id','path'],
	  		},{
	    	 model: PollResult,
	    	} ],
			where: {
	    	   status: 'active'
	    	 },
		}
	  ],
	});
	res.status(200).json(category);

}

exports.getAll = async (req,res) => {

	const category = await Category.findAll({
		include:[
	  	{
	  	 model: Media,
	  	 attributes: ['id','path'],
	  	},
	  ],
	});
	res.status(200).json(category);

}

exports.edit = async (req,res) => {

}

exports.deletes = async (req,res) => {



}
