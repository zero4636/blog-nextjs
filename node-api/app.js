const express = require('express');
const createError = require('http-errors');
require('express-async-errors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const authRouter = require('./src/auth/auth.routes');
const userRouter = require('./src/users/users.routes');
const postRouter = require('./src/posts/posts.routes');
const categoryRouter = require('./src/category/category.routes');
const writersRouter = require('./src/writers/writers.routes');

const app = express();

app.use(morgan('dev'));
app.use(
	bodyParser.urlencoded({
		extended: false,
	}),
);
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('APP IS RUNNING');
});

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/cate', categoryRouter);
app.use('/post', postRouter);
app.use('/writer', writersRouter);

app.use((req, res, next) => {
	next(createError(404));
});

app.use((err, req, res) => {
	console.log(err.stack);
	res.status(err.status || 500).send(err.message);
});

const server = app.listen(process.env.PORT_2, () => {
	console.log(`Express running → PORT ${server.address().port}`);
});
