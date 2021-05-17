const { User } = require('../models/User');

exports.login = async(req,res) => {

	const { email, password } = req.body;

	if (!email || !password)
	  return res.status(406).json({
	    data: null,
	    msg: "Email address and password must be provided.",
	  });

	const user = await User.findOne({
	  where: {
	    email: email,
	  },
	});
	if (!user)
	  return res.status(404).json({
	    data: null,
	    msg: "No any account is associated with this email address.",
	  });

	const isPassMatched = await user.isValidPassword(password);
	const token = user.getJwtSignedToken();
	res.status(200).json({
	  data: token,
	  msg: "Logged in successfully.",
	});

}

exports.register = async(req,res) => {

	const { name, email, password } = req.body;
	const checkIfExists = await User.count({
	  where: {
	    email: email,
	  },
	});
	if(checkIfExists)
		return res.status(409).json({
		  data: checkIfExists,
		  msg: "Email is already used.",
		});
	await User.create({
	    name: name,
	    email: email,
	    password: password,
	  });

	res.status(201).json({
	  data: checkIfExists,
	  msg: "Registered successfully.",
	});

} 