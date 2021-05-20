const express = require('express');
const healthRouter = require('./routes/health');
const taskRouter = require('./routes/tasks');
const userRouter = require('./routes/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const mainRouter = express.Router();

mainRouter.use('/health', healthRouter);
mainRouter.use('/tasks', taskRouter);
mainRouter.use('/users', userRouter);

app.use(mainRouter);

module.exports = app;