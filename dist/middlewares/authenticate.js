"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.errorHandler = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Missing authorization token' });
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, 'secret');
        req.username = decodedToken.username;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid authorization token' });
    }
};
exports.authenticate = authenticate;
const errorHandler = (error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ error: 'Internal sever error' });
};
exports.errorHandler = errorHandler;
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};
exports.logger = logger;
