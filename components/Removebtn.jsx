"use client" //as user interaction is present
import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'
import { useRouter } from 'next/navigation'
export default function Removebtn({ id }) {
  const router = useRouter();
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure bro?");
    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
        method: "DELETE",
      }
      )  //backticks as we get id as searchparam
      if(res.ok)
      {
        router.refresh()
      }
    }

  }
  return (
    <button onClick={removeTopic} className='text-red-400' >
      <HiOutlineTrash size={30} />
    </button>
  )
}


