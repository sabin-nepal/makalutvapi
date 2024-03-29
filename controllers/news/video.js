const { Video,Category } = require('../../models/news/Video');
const Media = require('../../models/Media')
const Adv = require('../../models/Adv')
const { getPagination } = require('../../helpers/pagination');
const { Op } = require("sequelize");

exports.create = async (req,res) => {

	const { title,media,status,category,thumbnail } = req.body

	if(!title || !media)
		return res.status(406).json({
		  success: false,
		  msg: "Title or media cannot be empty.",
		});
	const video =  await Video.create({
		title:title.trim(),
		videoId: media,
		status: status,
		thumbnailId: thumbnail,
		userId:req.user.id,

	});
	await video.addCategory(category);
	res.status(201).json({
	  success: true,
	  msg: "Video created successfully.",
	});
}

exports.getVideos = async(req,res)=>{
	const {size,page} = req.query;
	const {limit,offset} = getPagination(page,size);
	let videoAdv = [];
	const adv = await Adv.findAll({
	  where: {
	    status: 'active',
	    type: 'banner',
	  },
	  limit,
	  offset,
	  include: [
	    	{
	    	 model: Media,
	    	 attributes: ['id','path','type'],
	    	},
	    ], 
	  order: [
	      ['createdAt', 'DESC'],
	     ] 
	});
	const videos = await Video.findAll({
	  where: {
	    status: 'active',
	  },
	  limit,
	  offset,
	  include:[
	  		{
	  		 model: Media,
	  		 as: 'thumbnail',
	  		 attributes: ['path'],
	  		},
	  		{
	  		 model: Media,
	  		 as: 'media',
	  		 attributes: ['path'],
	  		},	
	  		{
	  		 model: Category,
	  		 attributes: ['id','title'],
	  		},	
	  ],	    	
	  order: [
	      ['createdAt', 'DESC'],
	     ] 
	})
	var j = 0;
	videos.map((video,key)=>{
		videoAdv.push(video);
		if(key%2===1 && adv.length > j){
			videoAdv.push(adv[j]);
			j++;
		}
		
	}) 
	res.status(200).json(videoAdv);

}

exports.getVideosTest = async(req,res)=>{
	const {size,page} = req.query;
	const {limit,offset} = getPagination(page,size);
	let videoAdv = [];
	const adv = await Adv.findAll({
	  where: {
	    status: 'active',
	    type: 'banner',
	  },
	  limit,
	  offset,
	  include: [
	    	{
	    	 model: Media,
	    	 attributes: ['id','path','type'],
	    	},
	    ], 
	  order: [
	      ['createdAt', 'DESC'],
	     ] 
	});
	const videos = await Video.findAll({
	  where: {
	    status: 'active',
	  },
	  limit,
	  offset,
	  include:[
	  		{
	  		 model: Media,
	  		 as: 'thumbnail',
	  		 attributes: ['path'],
	  		},
	  		{
	  		 model: Media,
	  		 as: 'media',
	  		 attributes: ['path'],
	  		},	
	  		{
	  		 model: Category,
	  		 attributes: ['id','title'],
	  		},	
	  ],	    	
	  order: [
	      ['createdAt', 'DESC'],
	     ] 
	})
	var j = 0;
	videos.map((video,key)=>{
		videoAdv.push(video);
		if(key%2===1 && adv.length > j){
			videoAdv.push(adv[j]);
			j++;
		}

		
	}) 
	res.status(200).json(videoAdv);

}

exports.getAll = async(req,res)=>{
	const { page, size,status } = req.query;
	const statusType = status ? status : ["active","inactive"];
  const { limit, offset } = getPagination(page, size);
	const video = await Video.findAndCountAll({
		where:{
			status:{
				[Op.or]: [statusType]
			  },
		},
		limit,
		offset,
	  include:[
	  		{
	  		 model: Media,
	  		 as: 'thumbnail',
	  		 attributes: ['path'],
	  		},
	  		{
	  		 model: Media,
	  		 as: 'media',
	  		 attributes: ['path'],
	  		},	
	  		{
	  		 model: Category,
	  		 attributes: ['id','title'],
	  		},	
	  ],	    	
	  order: [
	      ['createdAt', 'DESC'],
	     ] 
	});
	res.status(200).json(video);

}

exports.edit = async (req,res) => {
	const { title,media,category,thumbnail } = req.body
	const video = await Video.findByPk(req.params.id);
	if(!video)
		return res.status(401).json({
		  success: false,
		  msg: "Unauthorized.",
		});
	if(!title || !media)
		return res.status(406).json({
			success: false,
			msg: "Title or media cannot be empty.",
		});
	await video.removeCategory(video.categories)
	video.title = title.trim()
	video.videoId = media
	video.thumbnailId = thumbnail
	await video.addCategory(category);
	await video.save();
	res.status(201).json({
	  msg: "Video has been updated successfully.",
	});	
}


exports.deletes = async (req,res) => {

	const video = await Video.findByPk(req.params.id);
	if(!video)
		return res.status(401).json({
		  success: false,
		  msg: "Unauthorized.",
		});
	await video.destroy();	
	res.status(201).json({
	  msg: "Video has been deleted successfully.",
	});	

}