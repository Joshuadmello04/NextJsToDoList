import React from 'react';
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center bg-slate-800 px-8 py-3 rounded-full mt-4">
            <Link className='font-bold text-xl text-white' href={'/'} aria-label="Go to Home">TO-DO List</Link>
            <div className="flex gap-4">
                <Link 
                    className='font-bold text-xl bg-white p-2 rounded-2xl text-black hover:bg-slate-300 transition-colors' 
                    href={'/addTopic'} 
                    aria-label="Add a new topic"
                >
                    Add topic
                </Link>
            </div>
        </nav>
    );
}
