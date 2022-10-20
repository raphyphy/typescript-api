import { Request, RequestHandler } from 'express';
import Post from '../../models/Post';
import logger from '../../logger';

interface AddReqBody {
  title: string;
  userId: string
}

const add: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const { userId } : any = req.params
  const { title } = req.body;

  try {
    const post = new Post({ title, userId });
    await post.save();
  
    res.send({
      message: 'Post has been saved',
      post: post.toJSON()
    });
  } catch (err: any) { // TODO: middleware to throw error or create helper
    logger.error(err)
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
