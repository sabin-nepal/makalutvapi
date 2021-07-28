const Adv = require('../models/Adv');
//const Category = require('../models/Category')
const Media = require('../models/Media')
const { getPagination } = require('../helpers/pagination');
const { Op } = require("sequelize");
exports.create = async (req,res) => {

	const { title,url,media,startDate,endDate,status,type='banner'} = req.body
	if(!startDate || !endDate || !media)
		return res.status(406).json({
		  success: false,
		  msg: "Media, StartDate And EndDate Cannot Be Empty",
		});	
	const adv =  await Adv.create({
		title:title.trim(),
		mediumId:media,
		status:status,
		startDate:startDate,
		type:type,
		url:url,
		endDate:endDate,
		userId:req.user.id,
	});
	res.status(201).json({
	  success: true,
	  msg: "Advertsiment created successfully.",
	});
	
}

exports.checkAdv = async (req,res) => {

	const advertisement = await Adv.findAll({
		where: {
		  status: 'active',
		}});
	var datetime = Math.floor(new Date().getTime() /1000);
	advertisement.forEach(async (adv) => {
		var startTime = toTimestamp(adv.startDate);
		var endTime = toTimestamp(adv.endDate);
		if(startTime > datetime || endTime <= datetime){
			adv.status = 'inactive';
		}
		await adv.save();
	})
	res.status(201).json();
}

exports.getAdvs = async(req,res) => {
	const adv = await Adv.findAll({
	  where: {
	    status: 'active',
	  },
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
	res.status(200).json(adv);
}

exports.getAll = async(req,res) => {
	const { page, size,status } = req.query;
	const statusType = status ? status : ["active","inactive"];
  const { limit, offset } = getPagination(page, size);
	const adv = await Adv.findAndCountAll({
		where:{
			status:{
				[Op.or]: [statusType]
			  },
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
	res.status(200).json(adv);
}

exports.getByType = async(req,res) => {
	const adv = await Adv.findAll({
	  where: {
	    status: 'active',
	    type: req.params.type,
	  },
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
	res.status(200).json(adv);
}

// exports.getSingle = async(req,res) => {

// 	const { id } = req.params;
// 	const adv = await Adv.findByPk(id);
// 	if(!adv)
// 		return res.status(204).json();
// 	res.status(200).json(adv);
// }

exports.edit = async (req,res) => {
	const { title,url,media,startDate,endDate,status,type} = req.body
	const adv = await Adv.findByPk(req.params.id);
	if(!adv)
		return res.status(401).json({
		  success: false,
		  msg: "Unauthorized.",
		});
	if(!startDate || !endDate || !media)
		return res.status(406).json({
			success: false,
			msg: "Media, StartDate And EndDate Cannot Be Empty",
		});		
	//await adv.removeMedia(adv.media)
	adv.title = title.trim()
	adv.mediumId = media
	adv.startDate = startDate
	adv.endDate = endDate
	adv.status = status
	adv.url = url
	adv.type = type
	await adv.save();
	//await adv.addMedia(media);
	res.status(201).json({
	  msg: "Advertisement has been updated successfully.",
	});	
}


exports.deletes = async (req,res) => {

	const adv = await Adv.findByPk(req.params.id);
	if(!adv)
		return res.status(401).json({
		  success: false,
		  msg: "Unauthorized.",
		});
	await adv.destroy();	
	res.status(201).json({
	  msg: "Advertisement has been deleted successfully.",
	});	

}

const toTimestamp=(strDate)=>{
   var datum = Date.parse(strDate);
   return datum/1000;
}
