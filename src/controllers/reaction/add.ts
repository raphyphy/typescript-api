import { Request, RequestHandler } from 'express';
import Reaction from '../../models/Reaction';
import logger from '../../logger';

interface AddReqBody {
  reactionId: string;
  userId: string;
  type: string;
  commentText: string;
}

const add: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const { postId } : any = req.params
  const { type, commentText, userId } = req.body;

  try {
    const reaction = new Reaction({ postId, type, commentText, userId, read: false });
    await reaction.save();
  
    res.send({
      message: 'Reaction has been saved',
      reaction: reaction.toJSON()
    });
  } catch (err: any) { // TODO: middleware to throw error or create helper
    if (err.code === 11000) { // TODO: generic handler
      res.status(500).send({
        message: `${JSON.stringify(err.keyValue)} already exists!`
      })
    } 
    res.status(500).send({
      error: err
    })
  }

};

export default add;
