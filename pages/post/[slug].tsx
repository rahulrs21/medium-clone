// 1:18:00(https://youtu.be/6fNy0iD3hsk)

import { GetStaticProps } from 'next'
import PortableText from 'react-portable-text';
import Header from '../../components/Header'
import {sanityClient, urlFor} from '../../sanity'
import { Post } from '../../typings'

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

// This is the 'form fields in typescript'
interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}


interface Props {
  post: Post;
}

function Post({post}: Props) {

  const [submitted, setSubmitted] = useState(false);
  
  // This is basically connects our 'form' todo some operation in it. Before that we need to define 'form fields in typescript'(which I defined above 1:56:00).
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  // after form submit 
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch('/api/createComment', {
      method: "POST",
      body: JSON.stringify(data),
    }).then(() => {
      console.log(data) 
      setSubmitted(true)
    }).catch(err => {
      console.log(err);
      setSubmitted(false)
    })
    // create new file 'createComment.ts' under 'api' folder
  }

  return (
    <main>
        <Header />

        <img className='w-full object-cover h-40' src={urlFor(post.mainImage).url()!} alt="" />
        <article className='max-w-3xl mx-auto p-5'>
          <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
          <h2 className='text-xl font-light text-gray-500 mb-2'>{post.description}</h2>
          <div className='flex items-center space-x-2'>
            <img className='w-10 h-10 rounded-full' src={urlFor(post.author.image).url()!} alt="" />
            <p className='font-extralight text-sm'>Blog post by <span className='text-green-600'>{post.author.name}</span> - Published at {new Date(post._createdAt).toLocaleString()}</p>
          </div>

          {/* To display body texts, u need to install 'npm install react-portable-text' which is built for sanity */}
          <div className='mt-10'>
            {/* PortableText comes from by installing react-portable-text. It has many dependency  */}
            <PortableText 
              /* Here I defined 2 dependecny which is not defined in PortableText. To define that, U need to click the above 'PortableText'. (Cmd + click)
                It'll open new file, there u need to add this below dependencies in that file.
                so, dataset and projectId is not defined . so need to define there.
              */
              dataset = {process.env.NEXT_PUBLIC_SANITY_DATASET!}
              projectId = {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}

              content = {post.body}

              /* 
                copy the same code of sonny sangha(he told same 1:43:30)
                serializers takes the item when it goes across the array of objects, then that rich texts is an array of object(could be image, text or any),
                It'll do some action when it comes to particular tags (h1, img, etc..)
              */
              serializers = {
                {
                  h1: (props: any) => {
                    <h1 className='text-2xl font-bold my-5' {...props} />
                  },
                  h2: (props: any) => {
                    <h1 className='text-xl font-bold my-5' {...props} />
                  },
                  li: ({children}: any) => {
                    <li className='ml-4 list-disc'>{ children }</li>
                  },
                  link: ({ href, children }: any) => (
                    <a href={href} className='text-blue-500 hover:underline'>{children}</a>
                  ),
                }
              }
            />  
          </div>
        </article>

        <hr className='max-w-lg my-5 mx-auto border border-yellow-500' />
            
        {/* comment Section 
            # need to install 'npm i react-hook-form' ->react-hook-form' https://www.npmjs.com/package/react-hook-form
        */}

        {submitted ? (
          <div className='flex flex-col py-10 px-4 my-10 bg-yellow-500 text-white max-w-2xl mx-auto'>
            <h3 className='text-3xl font-bold'>Thank you for Submitting your comment! </h3>
            <p>Once it has been Approved, it'll appear below!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-5 my-10 max-w-2xl mx-auto mb-10'>
            <h3 className='text-sm text-yellow-500'>Enjoyed this article?</h3>
            <h4 className='text-3xl font-bold'>Leave a comment below!</h4>
            <hr className='py-3 mt-2' />

            {/* create new hidden input that can send the ID */}
            <input 
              type="hidden" 
              {...register("_id")} 
              name="_id" value={post._id} 
            />

            <label className='block mb-5'>
              <span className='text-gray-700'>Name</span>
              <input {...register("name", { required: true } )} className='shadow border rounded py-2 px-3 form-input mt-1 block w-full outline-yellow-500' placeholder='John Doe' type="text" />
            </label>

            <label className='block mb-5'>
              <span className='text-gray-700'>Email</span>
              <input {...register("email", { required: true } )} className='shadow border rounded py-2 px-3 mt-1 block w-full outline-yellow-500 form-input ' placeholder='Enter Email' type="email" />
            </label>

            <label className='block mb-5'>
              <span className='text-gray-700'>Comment</span>
              <textarea {...register("comment", {required: true} )} className='shadow border rounded py-2 px-3 form-textarea block w-full outline-yellow-500' placeholder='Enter your comment' rows={8} />
            </label>

            {/* Errors will return when field validation fails */}
            <div className='flex flex-col p-5'>
              {errors.name &&  (
                <span className='text-red-500'>- Name field is required*</span>
              )}

              {errors.email && (
                <span className='text-red-500'>- Email field is required*</span>
              )}

              {errors.comment && (
                <span className='text-red-500'>- Comment field is required*</span>
              )}
            </div>

            <input className='shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer' type="submit" value="Submit" />
          </form>
        )}
        
        {/* comments */}
        <div className='flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2'>
          <h3 className='text-4xl'>Comments</h3>
          <hr className='pb-2' />

          {post.comments.map((comment) => (
            <div key={comment._id}>
              <p><span className='text-yellow-500'>{comment.name} :</span>  {comment.comment}</p>
            </div>
          ))}
        </div>
        
    </main>
  )
}

export default Post

// This tells nextJs which post is to pre-render. getStaticPaths gives "array of paths" which gives all of 'slugs'
export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug {
      current
    }
  }`;

  const posts = await sanityClient.fetch(query);

  // we need to provide with array whereby each object has key called 'params', It has actual path inside of it. In our case [slug]
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current
    }
  }));

  return {
    paths,
    fallback: "blocking"  // 404 Not found - true/false blocking
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // This query is uses those slugs (getStaticPaths) and fetch information for each page.
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author -> {
      name,
      image
    },
    'comments': *[            
      _type == "comment" && 
      post._ref == ^._id &&
      approved == true
    ],
    description,
    mainImage,
    slug, 
    body
  }`;
  // Before adding 'comments' field be sure that u need to approve the comment in sanity.

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if(!post) {
    return {
      notFound: true    // Now,  fallback: "blocking" which is true
    }
  }

  return {
    props: {
      post
    },
    revalidate: 60,    // This enables ISR (Incremntal Static Regeneration). Defines "After 60 seconds it'll update the old cahced version".
  }
}

// we need to goto sanity vision section and write this below code
/*
 *[_type == "post" && slug.current == "my-first-post"][0]{
  _id,
  _createdAt,
  title,
  author -> {
    name,
    image
  },
  description,
  mainImage,
  slug, 
  body
}
*/