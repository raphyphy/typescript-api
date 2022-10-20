import { Request, RequestHandler } from 'express';
import User from '../../models/User';
import logger from '../../logger';

interface AddReqBody {
  username: string;
  name: string
}

const add: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const { username, name } = req.body;

  try {
    const user = new User({ username, name });
    await user.save();
  
    res.send({
      message: 'User has been saved',
      user: user.toJSON()
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
