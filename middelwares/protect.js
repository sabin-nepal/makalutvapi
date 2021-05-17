var jwt = require('jsonwebtoken');
const { User } = require("../models/User");

const protect = async (req,res,next) => {

	let token;
	if (
	req.headers.authorization &&
	req.headers.authorization.startsWith("Bearer")
	) {
		// Set token from Bearer token in header
		token = req.headers.authorization.split(" ")[1];
		// Set token from cookie
		}
	// else if (req.cookies.token) {
	//   token = req.cookies.token;
	// }

	// Make sure token exists
	if (!token) {
		return res.status(401).json({
		message: "Not authorized to access this route",
		});
	}

	try{

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findOne({
		  where: {
		    id: decoded.id,
		  },
		});

		if (!user) {
		  return res.status(403).json({
		    success: false,
		    message: "Not authorized to visit this resources",
		    data: null,
		  });
		} else {
		  req.user = user;
		  return next();
		}

	}catch (err) {
		return Error("Not authorized to access this route");
	}

}