import { Post } from '../typings'
import PortableText from 'react-portable-text'
import { urlFor } from '../sanity'
import PostProps from '../interfaces/postprops'

const Article = ({post} : PostProps) => {

    if (post == null) {
        return <></>
    }
    else{
        return (
            <>
                <img
                    className='w-full h-40 object-cover'
                    src={urlFor(post.mainImage)?.url()!}
                    alt="" />
    
                <article className='max-w-3xl mx-auto p-5'>
                    <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
                    <h2 className='text-xl font-light text-gray-500'>
                        {post.description}
                    </h2>
    
                    <div className='flex items-center space-x-2'>
                        <img
                            className='h-10 w-10 rounded-full'
                            src={urlFor(post.author.image)?.url()!}
                            alt="" />
                        <p className='font-extralight text-sm'>
                            Blog post by <span className='text-green-600'>{post.author.name}</span> - published at {" "}
                            {new Date(post._createdAt).toLocaleString()}
                        </p>
                    </div>
    
                    <div className='mt-10'>
                        <PortableText
                            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                            content={post.body}
                            serializers={
                                {
                                    h1: (props: any) => (
                                        <h1 className='text-2xl font-bold my-5' {...props} />
                                    ),
                                    h2: (props: any) => (
                                        <h1 className='text-xl font-bold my-5' {...props} />
                                    ),
                                    h3: (props: any) => (
                                        <h3 className='text-lg font-bold my-5' {...props} />
                                    ),
                                    li: ({ children }: any) => (
                                        <li className="ml-4 list-desc">{children}</li>
                                    ),
                                    link: ({ href, children }: any) => (
                                        <a href={href} className="text-blue-500 hover:underline">
                                            {children}
                                        </a>
                                    )
                                }
                            }
                        />
                    </div>
    
                    <hr className='max-w-lg mx-auto my-5 border border-yellow-500' />
    
                </article>
            </>
        )
    }
}

export default Article