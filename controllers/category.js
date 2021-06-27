const { News,Category } = require('../models/news/News');
const Media = require('../models/Media')
const PollResult = require('../models/news/PollResult')

exports.create = async (req,res) => {

	const { title,media,type="news" } = req.body

	if(!title)
		return res.status(406).json({
		  success:false,
		  msg: "Title cannot be empty.",
		});
	await Category.create({
	    title:title,
	    mediumId:media,
	    userId:req.user.id,
	    type:type,
	  });
	res.status(201).json({
	  success: true,
	  msg: "Category Created successfully.",
	});
	
}

exports.getNews = async (req,res) => {
    const {limit} = req.params;
	var news;
	let categoriesNews = [];
	const categories = await Category.findAll({
		include:[
	  	{
	  	 model: Media,
	  	 attributes: ['id','path'],
	  	},
	  ],
	});			
	categories.map(async(category)=>{
		news = await category.getNews({
			where: {
				status: 'active'
			  },
			limit:Number(limit),
			include:[{
				model: Media,
				attributes: ['id','path'],
			},{
		   model: PollResult,
		  } ],		  
		});
		var medium = category.medium !=null ?
		{
			'id' :  category.medium['id'],
			'path' : category.medium['path'],
		}:null;
        categoriesNews.push({
			'id': category.id,
			'title': category.title,
			medium,
			news,
		})
	})
    setTimeout(() => 
    res.status(200).json(categoriesNews),
     2000);

}

exports.getAll = async (req,res) => {
	if(req.params.type!='all')
		return getByType(req,res);
	if(Number(req.params.limit)!== -1)
		return getLimit(req,res);
	const category = await Category.findAll({
		include:[
	  	{
	  	 model: Media,
	  	 attributes: ['id','path'],
	  	},
	  ],
	});
	res.status(200).json(category);

}

const getLimit = async (req,res) => {
	const category = await Category.findAll({
		limit: Number(req.params.limit),  
		include:[
	  	{
	  	 model: Media,
	  	 attributes: ['id','path'],
	  	},
	  ],
	});
	res.status(200).json(category);
} 

const getByType = async (req,res) => {

	const category = await Category.findAll({
		where: {
			type: req.params.type,
		  },
		include:[
	  	{
	  	 model: Media,
	  	 attributes: ['id','path'],
	  	},
	  ],
	});
	res.status(200).json(category);

}

exports.edit = async (req,res) => {

	const { title,media,type="news" } = req.body
	const category = await Category.findByPk(req.params.id,{
		include:[
	  	{
	  	 model: Media,
	  	},
	  ],
	});
	if(!category)
		return res.status(401).json({
		  success: false,
		  msg: "Unauthorized.",
		});
	if(!title)
		return res.status(406).json({
		  success:false,
		  msg: "Title cannot be empty.",
		});
	category.title = title;
	category.media = media;

	await category.save();
	
	res.status(201).json({
	  success: true,
	  msg: "Category Updated successfully.",
	});

}

exports.deletes = async (req,res) => {

	const category = await Category.findByPk(req.params.id);
	if(!category)
		return res.status(401).json({
		  success: false,
		  msg: "Unauthorized.",
		});
	await category.destroy();	
	res.status(201).json({
	  success: true,
	  msg: "Category has been deleted successfully.",
	});	

}
