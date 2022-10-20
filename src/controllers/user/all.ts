import { RequestHandler } from 'express';
import User from '../../models/User';

const all: RequestHandler = async (req, res) => {
  const users = await User.find();
  res.send({ users });
};

export default all;
