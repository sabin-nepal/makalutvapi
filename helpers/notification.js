
var admin = require("firebase-admin");

exports.sendNotification = async(topics,title,content,image,id)=>{
	for(const i in topics){
		var topic = topics[i];
		const message = {
			  notification: {
			    title:title,
			  },
			  data: {
			  	click_action: "FLUTTER_NOTIFICATION_CLICK",
			    id:id,
			  },
			};
		const response = await admin.messaging().sendToTopic(topic,message)
		return response;  
	}
}