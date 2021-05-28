const Category = require('../models/Category');

exports.create = async (req,res) => {

	const { title,image,type="news" } = req.body

	if(!title)
		return res.status(406).json({
		  success:false,
		  msg: "Title cannot be empty.",
		});
	await Category.create({
	    title:title,
	    imageId:image,
	    userId:req.user.id,
	    type:type,
	  });
	res.status(201).json({
	  success: true,
	  msg: "Category Created successfully.",
	});
	
}

exports.getAll = async (req,res) => {

	const category = await Category.findAll();
	res.status(200).json(category);

}

exports.edit = async (req,res) => {

}

exports.deletes = async (req,res) => {



}
