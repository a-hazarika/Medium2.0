import { GetStaticProps } from 'next'
import React, { Children, useEffect, useState } from 'react'
import Article from '../../components/Article'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post, Comment } from '../../typings'
import PostProps from '../../interfaces/postprops'
import NewComment from '../../components/NewComment'
import Comments from '../../components/Comments'
import useScrollPosition from '../../hooks/use-scroll-position'


// interface Props {
//     post: Post;
// }


const Post = ({ post }: PostProps) => {

    const scrollPosition = useScrollPosition();

    const [bgColor, setBgColor] = useState('bg-yellow-400');
    
    useEffect(() => {
        // var position: number = +scrollPosition;

        if (scrollPosition > 100) {
            setBgColor('bg-white')      
        }
        else {
            setBgColor('bg-yellow-400')
        }
    }, [scrollPosition])

    return (
        <main>
            <div className={`fixed w-full z-10 left-0 bg-animate border-b border-black ${bgColor}`}>
                <Header scrollPosition={scrollPosition} borderClasses='' />
            </div>
            <div className='h-75'></div>
            <Article post={post} />
            <NewComment post={post} />
            <Comments comments={post.comments} />
        </main>
    )
}

export default Post

export const getStaticPaths = async () => {
    const query = `*[_type=="post"]{
        _id,
        slug {
            current
        }
    }`;

    const posts = await sanityClient.fetch(query);

    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    };
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type=="post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author -> {
            name,
            image
        },
        'comments': *[
            _type=="comment" 
            && post._ref == ^._id
            && approved == true 
        ],
        description,
        mainImage,
        slug,
        body
    }`;

    const post = await sanityClient.fetch(query, {
        slug: params?.slug
    });

    if (!post) {
        return {
            notFound: true
        }
    };

    return {
        props: {
            post
        },
        revalidate: 60  //after 60 seconds, it will update the old cached version
    }
}