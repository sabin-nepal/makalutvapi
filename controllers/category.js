const Category = require('../models/Category');
const Media = require('../models/Media') 

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
