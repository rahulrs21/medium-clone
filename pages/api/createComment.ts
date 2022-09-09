// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client';


// copy - paste the code (2:07:00)
const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: process.env.NODE_ENV === "production",
    token: process.env.SANITY_API_TOKEN   // allows us to read/write to the database securely.
};

const client = sanityClient(config);      // need to insatll 'npm i @sanity/client'

/*
  To get the API TOKEN, Go to sanity dashboard setting, https://www.sanity.io/manage/personal/project/w7zek3i2/api#tokens
  Here click 'add API Token' and name as 'Youtube Sanity' and tick 'Editor' mode and save it.
  once u save it, u get the TOKEN CODE. Copy it and paste it in '.env.local' file and restart the server localhost:3000
*/

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const {_id, name, email, comment} = JSON.parse(req.body);

  try {
    await client.create({
      // creating document in sanity CMS
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id
      },
      name,
      email,
      comment
    });
  }

  catch(error) {
    return res.status(500).json({ message: `Couldn't submit comment`, error })
  }

  console.log('Comment Submitted Successfully!')
  return res.status(200).json({ message: 'Comment Submitted' })
  // Once it is done, just test it, but u can't see the comment in ur localhost:3333 sanity server. Bcz u didn't created the schema for comment.
  // so goto 'sanityyoutube->schemas->comment.js(need to create this file)'
}
