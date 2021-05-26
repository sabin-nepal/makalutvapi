const { News,Category } = require('../../models/news/News');
var admin = require("firebase-admin");

exports.create = async (req,res) => {

	const { title, content, excerpt,url,category,status} = req.body
	if(!title || !content)
		return res.status(406).json({
		  success: false,
		  msg: "Title or content cannot be empty.",
		});	
	const news =  await News.create({
		title:title,
		content:content,
		excerpt:excerpt,
		thumbnail:url,
		status:status,
		userId:req.user.id,
	});
	await news.addCategory(category, { through: { selfGranted: false } });
	await sendNotification(category,title,content,url);
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
	  include: [
	    	{
	    	 model: Category,
	    	 through: {attributes: []}
	    	},
	    ],
	  order: [
	      ['createdAt', 'DESC'],
	     ] 
	});
	res.status(200).json(news);
}

exports.getSingle = async(req,res) => {

	const { id } = req.params;
	const news = await News.findByPk(id);
	if(!news)
		return res.status(204).json();
	res.status(200).json(news);
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

//categorynews

exports.getCategoryNews = async (req,res) => {

	const news = await News.findAll({
		where: {
    	   status: 'active'
    	 },
    	 order: [
    	     ['createdAt', 'DESC'],
    	    ],
		include: [
	    	{
	    	 model: Category,
	    	 attributes: ['title'],
	    	 where: {
	    	   id: req.params.id
	    	 },
	    	 through: {attributes: []}
	    	},
	    ]
	});
	res.status(200).json(news);
}



 async function sendNotification(topics,title,content,image){
	for(const topic in topics){
		const message = {
		  data: {
		    title:title,
		    content:content,
		    image:image,
		  },
		  topic: '/topics/'+topics[topic]
		};
		const response = admin.messaging().send(message)
		return response;  
	}
}