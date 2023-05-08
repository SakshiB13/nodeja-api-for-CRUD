"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("./database");
const authenticate_1 = require("./middlewares/authenticate");
const test_1 = require("./test");
// import { errorHandler } from './middlewares/authenticate';
// import { logger } from './middlewares/authenticate';
const app = (0, express_1.default)();
app.use(authenticate_1.logger);
app.use(express_1.default.json()); // parse incoming JSON requests
app.get('/items', async (req, res, next) => {
    try {
        const items = await database_1.db.getAllItems();
        res.json(items);
    }
    catch (error) {
        app.use(test_1.test);
        next(error);
    }
});
app.get('/items/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const item = await database_1.db.getItemById(id);
        res.json(item);
    }
    catch (error) {
        app.use(test_1.test);
        next(error);
    }
});
app.post('/items', authenticate_1.authenticate, async (req, res, next) => {
    try {
        const { name, description, price } = req.body;
        const newItem = await database_1.db.createItem({ name, description, price });
        res.json({ id: newItem });
    }
    catch (error) {
        app.use(test_1.test);
        next(error);
    }
});
app.put('/items/:id', authenticate_1.authenticate, async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { name, description, price } = req.body;
        await database_1.db.updateItem(id, { name, description, price });
        res.status(204).end();
    }
    catch (error) {
        app.use(test_1.test);
        next(error);
    }
});
app.delete('/items/:id', authenticate_1.authenticate, async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await database_1.db.deleteItem(id);
        res.status(204).end();
    }
    catch (error) {
        app.use(test_1.test);
        next(error);
    }
});
app.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const token = jsonwebtoken_1.default.sign({ username }, 'secret');
        res.json({ token });
    }
    catch (error) {
        app.use(test_1.test);
        next(error);
    }
});
app.post('/logout', authenticate_1.authenticate, async (req, res, next) => {
    try {
        res.status(204).end();
    }
    catch (error) {
        app.use(test_1.test);
        next(error);
    }
});
app.use(authenticate_1.errorHandler);
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
exports.default = app;
