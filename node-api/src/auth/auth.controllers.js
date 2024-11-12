const randToken = require('rand-token');
const bcrypt = require('bcrypt');

const userModel = require('../users/users.models');
const authMethod = require('./auth.methods');

const jwtVariable = require('../../variables/jwt');
const { SALT_ROUNDS } = require('../../variables/auth');

exports.register = async (req, res) => {
	const username = req.body.username.toLowerCase();
	const user = await userModel.getUser(username);
	if (user) {
		return res.status(409).json({ msg: 'Account name already exists.' });
	} else {
		const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
		const newUser = {
			username: username,
			password: hashPassword,
		};
		const createUser = await userModel.createUser(newUser);
		if (!createUser) {
			return res
				.status(400)
				.json({ msg: 'There was an error creating the account, please try again.' });
		}
		return res.json({
			username,
		});
	}
};

exports.login = async (req, res) => {
	const username = req.body.username.toLowerCase() || 'test';
	const password = req.body.password || '12345';

	const user = await userModel.getUser(username);
	if (!user) {
		return res.status(401).json({ msg: 'Username does not exist.' });
	}

	const isPasswordValid = bcrypt.compareSync(password, user.password);
	if (!isPasswordValid) {
		return res.status(401).json({ msg: 'Password is incorrect.' });
	}

	const accessTokenLife =
		process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;
	const accessTokenSecret =
		process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

	const dataForAccessToken = {
		username: user.username,
	};
	const accessToken = await authMethod.generateToken(
		dataForAccessToken,
		accessTokenSecret,
		accessTokenLife,
	);
	if (!accessToken) {
		return res
			.status(401)
			.json({ msg: 'Login failed, please try again.' });
	}

	let refreshToken = randToken.generate(jwtVariable.refreshTokenSize);
	if (!user.refreshToken) {
		await userModel.updateRefreshToken(user.username, refreshToken);
	} else {
		refreshToken = user.refreshToken;
	}

	return res.json({
		msg: 'Log in successfully.',
		accessToken,
		refreshToken,
		user,
	});
};

exports.refreshToken = async (req, res) => {
	const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(400).send('Access token not found.');
	}

	const refreshTokenFromBody = req.body.refreshToken;
	if (!refreshTokenFromBody) {
		return res.status(400).send('No refresh token found.');
	}

	const accessTokenSecret =
		process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
	const accessTokenLife =
		process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;

	const decoded = await authMethod.decodeToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	if (!decoded) {
		return res.status(400).send('Access token is invalid.');
	}

	const username = decoded.payload.username;

	const user = await userModel.getUser(username);
	if (!user) {
		return res.status(401).send('User does not exist.');
	}

	if (refreshTokenFromBody !== user.refreshToken) {
		return res.status(400).send('Refresh token is not valid.');
	}

	const dataForAccessToken = {
		username,
	};

	const accessToken = await authMethod.generateToken(
		dataForAccessToken,
		accessTokenSecret,
		accessTokenLife,
	);
	if (!accessToken) {
		return res
			.status(400)
			.send('Creating access token failed, please try again.');
	}
	return res.json({
		accessToken,
	});
};

exports.validateToken = async (req, res) => {
	return res.json({ msg: 'Access token is valid.' })
}