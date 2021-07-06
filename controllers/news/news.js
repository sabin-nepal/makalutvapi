const { News,Category } = require('../../models/news/News');
const Media = require('../../models/Media')
const PollResult = require('../../models/news/PollResult')
//const { getThumbnail } = require('../media')
const { getPagination } = require('../../helpers/pagination');
const { sendNotification } = require('../../helpers/notification.js')
const { Op } = require("sequelize");

exports.create = async (req,res) => {
	var notifyImage;
	const { title, content, type='news', excerpt,thumbnail,media,category,status,pollTitle} = req.body
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
// 	var thumbnailImage = media;
// 	if(thumbnail)
// 		thumbnailImage = thumbnail;
	//notifyImage = await getThumbnail(thumbnailImage);
	const news =  await News.create({
		title:title.trim(),
		content:content,
		excerpt:excerpt,
		status:status,
		type:type,
		pollTitle: pollTitle,
		userId:req.user.id,
	});
	await news.addCategory(category, { through: { selfGranted: false } });
	await news.setMedia(media);
	if(type=='poll'){
		await PollResult.create({
			yesCount:0,
			noCount:0,
			newsId:news.id,
		})
	}
	if(category)
		await sendNotification(category,title,content,notifyImage,news.id);
	res.status(201).json({
	  success: true,
	  msg: `${type} created successfully.`,
	});
}

exports.getAll = async(req,res) => {
	const news = await News.findAll({
	  where: {
	    status: 'active',
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
	    	{
	    	 model: PollResult,
	    	} 
	    ], 
	  order: [
	      ['createdAt', 'DESC'],
	     ] 
	});
	res.status(200).json(news);
}

exports.getNews = async(req,res) => {
  const { page, size,type,status } = req.query;
  const postType = type ? type : ["news","poll"];
  const statusType = status ? status : ["active","inactive"];
  const { limit, offset } = getPagination(page, size);
	const news = await News.findAndCountAll({
		where:{
			status:{
				[Op.or]: [statusType]
			  },
			type:{
				[Op.or]: [postType]
			  }	
		},
		limit,
		offset,
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
	    	{
	    	 model: PollResult,
	    	} 
	    ], 
	  order: [
	      ['createdAt', 'DESC'],
	     ] 
	});
	res.status(200).json(news);
}

const getAllNewsByType = exports.getType = async(req,res) => {
	const {type} = req.params;
	const news = await News.findAll({
	  where: {
	    status: 'active',
	    type: type,
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
	    	{
	    	 model: PollResult,
	    	} 
	    ],
	  order: [
	      ['createdAt', 'DESC'],
	     ] 
	});
	res.status(200).json(news);
}


exports.getTypeLimit = async(req,res) => {
	const {type,limit} = req.params;
	if(Number(limit)===-1){
		await getAllNewsByType(req,res);
	}
	else{
		const news = await News.findAll({
		  where: {
		    status: 'active',
		    type: type,
		  },
		  limit: Number(limit),
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
		    	{
		    	 model: PollResult,
		    	} 
		    ],
		  order: [
		      ['createdAt', 'DESC'],
		     ] 
		});
		res.status(200).json(news);	
	}	
}

exports.getSingle = async(req,res) => {

	const { id } = req.params;
	const news = await News.findByPk(id);
	if(!news)
		return res.status(204).json();
	res.status(200).json(news);
}

exports.edit = async (req,res) => {
	const { title, content, excerpt,media,category,status,type='news',pollTitle} = req.body
	const news = await News.findByPk(req.params.id,{
			include: [
		    	{
		    	 model: Category,
		    	},
				{
					model: Media,
				   },
		    ]
	});
	if(!news)
		return res.status(401).json({
		  success: false,
		  msg: "Unauthorized.",
		});
	if(!title || !content || !media)
		return res.status(406).json({
		  success: false,
		  msg: "Title , content or media cannot be empty.",
		});
	if(news.type!=='poll' && type=='poll'){
    	await PollResult.create({
    		yesCount:0,
    		noCount:0,
    		newsId:news.id,
    	})
	}
	await news.removeCategory(news.categories)
	await news.removeMedia(news.media)
	news.title = title
	news.content = content
	news.excerpt = excerpt
	news.status = status
	news.pollTitle = pollTitle
	news.type = type
	await news.addCategory(category, { through: { selfGranted: false } });
	await news.addMedia(media, { through: { selfGranted: false } });
	await news.save();
	res.status(201).json({
	  success: true,
	  msg: "News has been updated successfully.",
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

	const {id,limit} = req.params;
	var setLimit; 
	if(Number(limit)===-1){
		setLimit = null;
	}
	else{
		setLimit = Number(limit); 
	}
	const news = await News.findAll({
		where: {
    	   status: 'active'
    	 },
    	 limit: setLimit,
    	 order: [
    	     ['createdAt', 'DESC'],
    	    ],
		include: [
	    	{
	    	 model: Category,
	    	 where: {
	    	   id: id
	    	 },
	    	 through: {attributes: []}
	    	},
	    	{
	    	 model: PollResult,
	    	}, 
	    	{
	    	 model: Media,
	    	 attributes: ['id','path','type'],
	    	 through: {attributes: []}
	    	},
	    ]
	});
	res.status(200).json(news);
}

//voting

exports.vote = async(req,res) => {

	const { choice } = req.body;
	const pollResult = await PollResult.findOne({
		where:{
			newsId:req.params.id,
		}
	});
	if(!pollResult)
		return res.status(401).json({
		  success: false,
		  msg: "Unauthorized.",
		});
	if(choice==1)
		pollResult.yesCount++;
	else
		pollResult.noCount++; 

	await pollResult.save();
	res.status(201).json(pollResult);
}

exports.getVoteResult = async(req,res) => {

	const pollResult = await PollResult.findOne({
		where:{
			newsId:req.params.id,
		},
		attributes: {
		        exclude: ['createdAt', 'updatedAt']
		    },
	});
	if(!pollResult)
		return res.status(401).json({
		  success: false,
		  msg: "Unauthorized.",
		});
	res.status(200).json(pollResult);

}

exports.getSearchResult = async(req,res) => {
	const {s} = req.params;
	const news = await News.findAll({
	  where: {
	    status: 'active',
	    [Op.or]: [
	          { 'title': { [Op.like]: '%' + s + '%' } },
	        ]
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
	    	{
	    	 model: PollResult,
	    	} 
	    ], 
	  order: [
	      ['createdAt', 'DESC'],
	     ] 
	});
	res.status(200).json(news);	
}