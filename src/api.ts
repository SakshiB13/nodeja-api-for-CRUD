import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from './database';
import { authenticate , errorHandler,logger } from './middlewares/authenticate';
import {test} from './test'
// import { errorHandler } from './middlewares/authenticate';
// import { logger } from './middlewares/authenticate';

const app = express();
app.use(logger);
app.use(express.json()); // parse incoming JSON requests


app.get('/items', async (req, res, next) => {
  try {
    const items = await db.getAllItems();
    res.json(items);
  } catch (error) {
    app.use(test);

    next(error);
  }
});

app.get('/items/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const item = await db.getItemById(id);
    res.json(item);
  } catch (error) {
    app.use(test);

    next(error);
  }
});

app.post('/items', authenticate, async (req, res, next) => {
  try {
    const { name, description, price } = req.body;
    const newItem = await db.createItem({ name, description, price });
    res.json({ id: newItem });
  } catch (error) {
    app.use(test);

    next(error);
  }
});

app.put('/items/:id', authenticate, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name, description, price } = req.body;
    await db.updateItem(id, { name, description, price });
    res.status(204).end();
  } catch (error) {
    app.use(test);

    next(error);
  }
});

app.delete('/items/:id', authenticate, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await db.deleteItem(id);
    res.status(204).end();
  } catch (error) {
    app.use(test);

    next(error);
  }
});

app.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = jwt.sign({ username}, 'secret');
    res.json({ token });
  } catch (error) {
    app.use(test);
    next(error);
  }
});

app.post('/logout', authenticate, async (req, res, next) => {
  try {
    res.status(204).end();
  } catch (error) {
    app.use(test);

    next(error);
  }
});

app.use(errorHandler);
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

export default app;
