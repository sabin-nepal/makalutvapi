const { News,Category } = require('../../models/news/News');

exports.create = async (req,res) => {

	const { title, content, category,type="news",status} = req.body

	if(!title || !content)
		return res.status(406).json({
		  success: false,
		  msg: "Title or content cannot be empty.",
		});
	const news =  await News.create({
		title:title,
		content:content,
		type:type,
		status:status,
		userId:req.user.id,
	});
	await news.addCategory(category, { through: { selfGranted: false } });
	res.status(201).json({
	  success: true,
	  msg: "News created successfully.",
	});
}

exports.edit = async (req,res) => {



}

exports.deletes = async (req,res) => {
	
	const { id } = req.params;
	const news = await News.findByPk(id);
	if(!news)
		return res.status(401).json({
		  success: false,
		  msg: "Unauthorized.",
		});
	await news.destroy();
	res.status(201).json({
	  success: true,
	  msg: "News has been deleted successfully.",
	});	

}