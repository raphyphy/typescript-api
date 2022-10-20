import { RequestHandler } from 'express';
import Reaction from '../../models/Reaction';
import logger from '../../logger';

const update: RequestHandler = async (req, res) => {
  try {
    const type = req.query?.type ? [ req.query?.type ] : [ "like", "comment" ]
    const { postId } = req.params

    const updatedCount = await Reaction.updateMany({ postId , type: {$in: type} }, {$set: {read: true}})

    res.send({updatedCount});
  } catch (err) {
    logger.error(err)
    res.status(500).send({
      error: err
    })
  }
};

export default update;
