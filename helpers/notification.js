
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
			    id:'7a327fca-3dbe-43b1-8f9e-b21d36c27cf9',
			  },
			};
		const response = await admin.messaging().sendToTopic(topic,message)
		return response;  
	}
}