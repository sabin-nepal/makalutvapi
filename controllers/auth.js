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

// exports.forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   if (!email)
//     return res.status(406).json({
//       data: null,
//       msg: "Email address must be provided.",
//     });

//   const user = await User.findOne({
//     where: {
//       email: email,
//     },
//   });

//   if (!user)
//     return res.status(403).json({
//       data: null,
//       msg: "No email address is associated wih any account.",
//     });

//   const resetToken = user.getResetPasswordToken();

//   const resetUrl = `${req.protocol}://${req.get(
//     "host"
//   )}/api/v1/auth/reset-password/${resetToken}`;

//   const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n${resetUrl}\n\n\nJoin Me Team`;

//   try {
//     await sendEmail({
//       email: user.email,
//       subject: "Password reset token",
//       message,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Password reset link is successfully sent.",
//       data: null,
//     });
//   } catch (e) {
//     user.resetPasswordToken = null;
//     user.resetPasswordExpire = null;
//     await user.save();
//     return res.status(500).json({
//       success: false,
//       message: "Failed to send the password reset link",
//       data: e.message,
//     });
//   }
// };
// exports.resetPassword = async (req, res) => {
//   const { token } = req.params;

//   if (!token)
//     return res.status(406).json({
//       data: null,
//       msg: "Token is invalid",
//     });

//   const passwordHash = crypto.createHash("sha256").update(token).digest("hex");

//   const user = await User.findOne({
//     where: {
//       resetPasswordToken: passwordHash,
//     },
//   });

//   if (!user)
//     return res.status(403).json({
//       data: null,
//       msg: "Reset token is either expired or not valid.",
//     });

//   user.password = req.body.password;
//   user.resetPasswordToken = null;
//   user.resetPasswordExpire = null;
//   await user.save();

//   res.status(200).json({
//     success: true,
//     data: null,
//     msg: "Password is successfully reset.",
//   });
// };
// exports.changePassword = async (req, res) => {
//   const { currentPassword, newPassword } = req.body;

//   if (!currentPassword || !newPassword)
//     res.status(406).json({
//       data: null,
//       msg: "Current Password & New password must be provided.",
//     });

//   const user = await User.findByPk(req.user.id);

//   const isMatched = await user.matchPassword(currentPassword);

//   if (!isMatched)
//     return res.status(401).json({
//       data: null,
//       msg: "Current password doesnot matched.Try again",
//     });

//   user.password = newPassword;
//   await user.save();

//   res.status(200).json({
//     data: user,
//     msg: "Password is changed successfully.",
//   });
// };
// exports.updateInfo = async (req, res) => {
//   const { name, email } = req.body;

//   const user = await User.findByPk(req.user.id);

//   user.name = name;

//   if (email) user.email = email;

//   await user.save();

//   res.status(200).json({
//     data: user,
//     msg: "User info is updated successfully.",
//   });
// };
exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    data: "Successfully logged out",
  });
};