import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import PostProps from "../interfaces/postprops";

interface IFormInput {
    _id: string;
    name: string;
    email: string;
    comment: string;
}

const NewComment = ({ post }: PostProps) => {

    const [submitted, setSubmitted] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        await fetch("/api/createComment", {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(() => {
                console.log(data);
                setSubmitted(true);
            }).catch((err) => {
                console.log(err);
                setSubmitted(false);
            })
    };

    return (
        <>
            {submitted ? (
                <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white
                max-w-2xl mx-auto">
                    <h3 className="text-3xl font-bold">Thank you for submitting your comment!</h3>
                    <p>Once it has been approved, it will appear below!</p>
                </div>
            )
                :
                (
                    <form className='flex flex-col p-5 max-w-2xl mx-auto mb-10'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h3 className='text-yellow-500 text-sm'>Enjoyed this article?</h3>
                        <h4 className='text-3xl font-bold'>Leave a comment below!</h4>
                        <hr className='py-3 mt-2' />



                        <input
                            {...register("_id")}
                            type="hidden"
                            name="_id"
                            value={post._id}
                        />

                        <label className='block mb-5'>
                            <span className='text-gray-700'>Name</span>
                            <input
                                {...register("name", { required: true })}
                                className='shadow borderrounded py-2 px-3 form-input mt-1 block w-full 
                        ring-yellow-500 outline-none focus:ring-1' placeholder='John Doe' type="text" />
                        </label>
                        <label className='block mb-5'>
                            <span className='text-gray-700'>Email</span>
                            <input
                                {...register("email", { required: true })}
                                className='shadow borderrounded py-2 px-3 form-input mt-1 block w-full 
                        ring-yellow-500 outline-none focus:ring-1' placeholder='test@email.com' type="email" />
                        </label>
                        <label className='block mb-5'>
                            <span className='text-gray-700'>Comment</span>
                            <textarea
                                {...register("comment", { required: true })}
                                className='shadow border rounded py-2 px-3 form-textarea mt-1 block w-full 
                        ring-yellow-500 outline-none focus:ring-1' placeholder='Comment' rows={8} />
                        </label>

                        <div className='flex flex-col p-5'>
                            {errors.name && (
                                <span className='text-red-500'>The Name field is required</span>
                            )}
                            {errors.email && (
                                <span className='text-red-500'>The Email field is required</span>
                            )}
                            {errors.comment && (
                                <span className='text-red-500'>The Comment field is required</span>
                            )}
                        </div>

                        <input type="submit" value="Submit"
                            className='shadow bg-yellow-500 hover:bg-yellow-400
                focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer' />
                    </form>
                )}
        </>
    )
}

export default NewComment