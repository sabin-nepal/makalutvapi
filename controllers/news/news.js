const { News,Category } = require('../../models/news/News');
const Media = require('../../models/Media')
const { getThumbnail } = require('../media')
var admin = require("firebase-admin");

exports.create = async (req,res) => {
	var notifyImage;
	const { title, content, type='news', excerpt,thumbnail,media,category,status} = req.body
	if(!title || !content || !media)
		return res.status(406).json({
		  success: false,
		  msg: "Title , content or media cannot be empty.",
		});
	// const getMedia = await Media.findByPk(media);
	// if(getMedia.type=='video' && !thumbnail){
	// 	return res.status(406).json({
	// 	  success: false,
	// 	  msg: "Thumbnail Required.",
	// 	});
	// }
	if(thumbnail)
		notifyImage = thumbnail;
	notifyImage = media;
	notifyImage = await getThumbnail(notifyImage);
	const news =  await News.create({
		title:title,
		content:content,
		excerpt:excerpt,
		status:status,
		type:type,
		userId:req.user.id,
	});
	await news.addCategory(category, { through: { selfGranted: false } });
	await news.setMedia(media);
	if(category)
		await sendNotification(category,title,content,notifyImage,type);
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
	    	{
	    	 model: Media,
	    	 attributes: ['id','path','type'],
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
	const { title, content, excerpt,media,category,status} = req.body
	const news = await News.findByPk(req.params.id,{
			include: [
		    	{
		    	 model: Category,
		    	},
		    ]
	});
	if(!news)
		return res.status(401).json({
		  success: false,
		  msg: "Unauthorized.",
		});
	await news.removeCategory(news.categories)
	await news.removeMedia(news.media)
	news.title = title
	news.content = content
	news.excerpt = excerpt
	news.status = status
	await news.addCategory(category, { through: { selfGranted: false } });
	await news.addMedia(media, { through: { selfGranted: false } });
	await news.save();
	res.status(201).json({
	  success: true,
	  msg: "News has been deleted successfully.",
	});	
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



async function sendNotification(topics,title,content,image,type){
	for(const topic in topics){
		const message = {
		  data: {
		    title:title,
		    content:content,
		    image:image,
		    type:type,
		  },
		  topic: '/topics/'+topics[topic]
		};
		const response = admin.messaging().send(message)
		return response;  
	}
}