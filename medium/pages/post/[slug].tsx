import { GetStaticProps } from 'next'
import React, { Children } from 'react'
import Article from '../../components/Article'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post, Comment } from '../../typings'
import PostProps from '../../interfaces/postprops'
import NewComment from '../../components/NewComment'
import Comments from '../../components/Comments'


// interface Props {
//     post: Post;
// }


const Post = ({ post }: PostProps) => {

    const comments  = post.comments
    return (
        <main>
            <Header />
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