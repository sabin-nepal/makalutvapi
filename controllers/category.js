const Category = require('../models/Category');

exports.create = async (req,res) => {

	const { title,type="news" } = req.body

	if(!title)
		return res.status(406).json({
		  success:false,
		  msg: "Title cannot be empty.",
		});
	await Category.create({
	    title:title,
	    userId:req.user.id,
	    type:type,
	  });
	res.status(201).json({
	  success: true,
	  msg: "Category Created successfully.",
	});
	
}

exports.edit = async (req,res) => {

}

exports.deletes = async (req,res) => {



}
