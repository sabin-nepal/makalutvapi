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
	res.status(201).json({		
	  msg: "Poll created successfully.",
	});
}

//edit poll

//delete poll

exports.deletes = async (req,res) => {
	const poll = await Poll.findByPk(req.params.id);
	if(!poll)
		return res.status(401).json({
		  msg: "Unauthorized.",
		});
	await poll.destroy();
	res.status(201).json({
	  msg: "Poll has been deleted successfully.",
	});	

}

//voting

exports.vote = async(req,res) => {

	const { yes,no,pollId } = req.body;
	const pollResult = await PollResult.create({
		yesCount:yes,
		noCount:no,
		pollId:pollId,
	})
	res.status(201).json({
	  msg: "Voted successfully.",
	});
}