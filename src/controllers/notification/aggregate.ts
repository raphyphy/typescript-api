import { RequestHandler } from 'express';
import Reaction from '../../models/Reaction';
import Post from '../../models/Post';

const aggregate: RequestHandler = async (req, res) => {
  const query = req.query

  const raw = query?.raw ? true : false
  const type = query?.type ? [ query?.type ] : [ "like", "comment" ]
  let read : any = query?.read ? query?.read : [true, false]
  if (typeof(query?.read) === 'string') {
    read = query?.read === 'false' ? [ false ] : [ true ]    
  }
  const { userId } = req.params

  const posts = await Post.find({ userId }, '_id title')
  let notifications : any = []

  for (const post of posts) {
    for (const r of read) {

      let notification : any = {}
      let flag = raw
      notification['postId'] = post._id
      notification['title'] = post.title
      notification['read'] = r

      for (const t of type) {
        notification[t.toString()] = await Reaction.find({ postId: post._id, read: r, type: t}, '_id userId commentText')
        if (notification[t.toString()].length > 0) {
          flag = true
        }
      }
      if (!!flag) {
        notifications.push(notification)
      }
    }
  }
  res.send({
    notifications
  });
};

export default aggregate;
