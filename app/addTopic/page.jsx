"use client"  //to change to client component (webppage)....server=>(terminal)
//without use client its a server component(deafault of nextjs)
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function AddTopic() {
    //state hooks are for react functions not destructured const ones
    //create states for input fields
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();
    //handle submit function
    const handleSubmit = async(e) =>{  //destructuring needed
        e.preventDefault(); // Prevent page refresh
        if(!title || !description){
            alert('title and description are required bro')
        }

        try{
            const res = await fetch("http://localhost:3000/api/topics" ,{
                method: 'POST',
                headers: {
                    "Content-type": "application.json"
                },
                body: JSON.stringify({title,description}) 
            }  );//post req endpt
        if(!res.ok){
            throw new Error('Failed to ceate topic')
        }
        router.push('/');
        router.push('/');
        }
        catch (error) {
            console.log("Error")
        }
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="rounded-full border border-slate-500 px-8 py-2" type="text" 
                placeholder="Enter Topic Title" />
            <input
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="rounded-full border border-slate-500 px-8 py-3" type="text" 
                placeholder="Enter Topic Description" />
            <button
            type='submit'
            className='bg-green-500 py-3 px-6 w-fit text-white font-bold rounded-full'>Add Topic</button>
        </form>
    )
}

