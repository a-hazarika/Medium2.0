import React from 'react'
import PostComments from '../interfaces/postcomments'
import PostProps from '../interfaces/postprops'
import { Post } from '../typings'
import Comment from './Comment'



const Comments = ({ comments }: PostComments) => {

    return (
        <div className='flex flex-col p-10 my-10 max-w-lg sm:max-w-2xl mx-auto shadow shadow-yellow-500'>
            <h3 className='text-4xl'>Comments</h3>
            <hr className='pb-2' />
            {comments.length === 0 && <>
                <h1 className='text-xl'>There are no comments!</h1>
            </>}
            {comments.length > 0 && comments.map((comment) => (
                <div key={comment._id}>
                    <Comment comment={comment} />
                </div>
            ))
            }
        </div>
    )
}

export default Comments