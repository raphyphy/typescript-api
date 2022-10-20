import { RequestHandler } from 'express';
// import requestMiddleware from '../../middleware/request-middleware';
import Post from '../../models/Post';
import logger from '../../logger';

const all: RequestHandler = async (req, res) => {
  logger.info(`Test`)
  const { userId } : any = req.params
  const posts = await Post.find({ userId });
  res.send({ posts });
};

export default all;
