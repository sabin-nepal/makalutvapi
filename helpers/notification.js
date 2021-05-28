
var admin = require("firebase-admin");

exports.sendNotification = async(topics,title,content,image,type)=>{
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
		console.log(response)
		return response;  
	}
}