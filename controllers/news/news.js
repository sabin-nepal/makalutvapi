const { News,Category } = require('../../models/news/News');

exports.create = async (req,res) => {

	let url;
	const { title, content, excerpt,category,type="news",status} = req.body

	if(!title || !content)
		return res.status(406).json({
		  success: false,
		  msg: "Title or content cannot be empty.",
		});
	if(req.file)
		 url = process.env.UPLOAD_URL + req.file.filename	
	const news =  await News.create({
		title:title,
		content:content,
		excerpt:excerpt,
		thumbnail:url,
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

exports.getAll = async(req,res) => {

	const news = await News.findAll({
	  where: {
	    status: 'active'
	  },
	  order: [
	      ['createdAt', 'DESC'],
	     ] 
	});
	res.status(200).json({
	  data:news,		
	  success: true
	});
}

exports.getSingle = async(req,res) => {

	const { id } = req.params;
	const news = await News.findByPk(id);
	if(!news)
		return res.status(204).json();
	res.status(200).json({
	  data:news,		
	  success: true,
	});
}

exports.edit = async (req,res) => {

}

exports.deletes = async (req,res) => {
	const news = await News.findByPk(req.params.id);
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