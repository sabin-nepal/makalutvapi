const { Poll,PollResult } = require('../../models/news/Poll');

exports.create = async(req,res) => {

	const { title,content,image,endDate,status } = req.body;
	if(!title){
		return res.status(406).json({
		  msg: "Title cannot be empty.",
		});	
	}
	const poll = await Poll.create({
		title:title,
		content:content,
		image:image,
		endDate:endDate,
		status:status,
		userId:req.user.id,
	})
	await PollResult.create({
		yesCount:0,
		noCount:0,
		pollId:poll.id,
	})
	res.status(201).json({		
	  msg: "Poll created successfully.",
	});
}

//get poll with result

exports.getAll = async (req,res) => {
	const poll = await Poll.findAll({
		  where: {
		    status: true,
		  },
		  include: [
		    	{
		    	 model: PollResult,
		    	 attributes: ['yesCount','noCount']
		    	},
		    ],
		  order: [
		      ['createdAt', 'DESC'],
		     ]
		});
	res.status(200).json({
	  data:poll,
	});

}

//edit poll

exports.edit = async(req,res) => {
	const {title,image,content,endDate,status} = req.body
	const poll = await Poll.findByPk(req.params.id);
	if(!poll)
		return res.status(401).json({
		  success: false,
		  msg: "Unauthorized.",
		});
	if(!title){
		return res.status(406).json({
		  msg: "Title cannot be empty.",
		});	
	}
	poll.title = title
	poll.image = image
	poll.content = content
	poll.endDate = endDate
	poll.status = status
	await poll.save();
	res.status(201).json({
	  success: true,
	  msg: "Poll has been edited successfully.",
	});

}

//delete poll

exports.deletes = async (req,res) => {
	const poll = await Poll.findByPk(req.params.id);
	if(!poll)
		return res.status(401).json({
		  msg: "Unauthorized.",
		});
	await poll.destroy();
	res.status(200).json({
	  msg: "Poll has been deleted successfully.",
	});	

}

//voting

exports.vote = async(req,res) => {

	const { choice,pollId } = req.body;
	const pollResult = await PollResult.findOne({
		where:{
			pollId:pollId,
		}
	});
	if(choice==1)
		pollResult.yesCount++;
	else
		pollResult.noCount++; 

	await pollResult.save();
	res.status(201).json({
	  msg: "Voted successfully.",
	});
}
