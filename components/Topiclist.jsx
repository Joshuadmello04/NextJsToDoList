import React, { useEffect, useState } from 'react';
import Removebtn from './Removebtn';
import Link from 'next/link';
import { HiPencilAlt } from 'react-icons/hi';

const fetchTopics = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/topics', {
      cache: 'no-store', // Prevent caching
    });

    if (!res.ok) {
      throw new Error('Failed to fetch Topics');
    }
    return res.json();
  } catch (error) {
    console.error('Error loading topics: ', error);
    return { topics: [] }; // Return empty array if there's an error
  }
};

export default function Topiclist() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTopics = async () => {
      const { topics } = await fetchTopics();
      setTopics(topics);
      setLoading(false);
    };
    
    getTopics();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading topics...</div>;
  }

  return (
    <div className="space-y-5">
      {topics.map((t) => (
        <div 
          key={t.id} 
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start rounded-2xl shadow-lg transition-transform transform hover:scale-105"
        >
          <div>
            <h2 className="font-bold text-2xl text-gray-800 hover:text-purple-600 transition-colors">{t.title}</h2>
            <div className="text-gray-600">{t.description}</div>
          </div>
          <div className="flex gap-2 py-3">
            <Removebtn id={t._id} aria-label={`Remove topic: ${t.title}`} />
            <Link href={`/editTopic/${t._id}`} aria-label={`Edit topic: ${t.title}`}>
              <HiPencilAlt size={30} className="text-gray-600 hover:text-purple-600 transition-colors" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
