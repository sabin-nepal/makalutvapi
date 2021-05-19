const Category = require('../models/Category');

exports.create = async (req,res) => {

	const { title } = req.body
	console.log(title)

	if(!title)
		return res.status(406).json({
		  success:false,
		  msg: "Title cannot be empty.",
		});
	await Category.create({
	    title:title,
	    userId:req.user.id,
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
