const jwtVariable = require('../../variables/jwt');

const userModle = require('../users/users.models');

const authMethod = require('./auth.methods');

exports.isAuth = async (req, res, next) => {
	const accessTokenFromHeader = req.headers.x_authorization;

	if (!accessTokenFromHeader) {
		return res.status(401).json({ msg: 'Access token not found!' });
	}

	const accessTokenSecret =
		process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

	const verified = await authMethod.verifyToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	if (!verified) {
		return res
			.status(401)
			.json({ msg: 'You do not have access to this feature!' });
	}

	const user = await userModle.getUser(verified.payload.username);
	req.user = user;

	return next();
};
