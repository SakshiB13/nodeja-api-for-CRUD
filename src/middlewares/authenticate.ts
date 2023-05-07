import express from 'express';
import jwt from 'jsonwebtoken';
declare global {
  namespace Express {
    interface Request {
      username?: String;
    }
  }
}

export const authenticate = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Missing authorization token' });
  }
  try {
    const decodedToken = jwt.verify(token, 'secret') as {
      username: string;
    };
    
    req.username = decodedToken.username;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid authorization token' });
  }
};

export const errorHandler = (
  error: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.error(error.stack);
  res.status(500).json({ error: 'Internal sever error' });
};
 
export const logger = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
