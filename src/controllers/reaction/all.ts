import { RequestHandler } from 'express';
import Reaction from '../../models/Reaction';
import logger from '../../logger';

const all: RequestHandler = async (req, res) => {
  logger.info(`Test`)
  const { postId } : any = req.params
  const reactions = await Reaction.find({ postId });
  res.send({ reactions });
};

export default all;
