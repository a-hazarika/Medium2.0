import React from 'react'
import { Comment } from '../typings'

interface CommentItem {
    comment: Comment
}

const Comment = ({comment}: CommentItem) => {
    return (
        <p>
            <span className='text-yellow-500'>
                {comment.name}:
            </span>
            {' '}
            {comment.comment}
        </p>
    )
}

export default Comment