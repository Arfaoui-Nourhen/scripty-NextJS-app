"use client"

import Profile from '@components/Profile'
import { useParams, useSearchParams } from 'next/navigation'
import { useState , useEffect } from 'react'

const userProfile = () => {
    const searchParams = useSearchParams();
    const username =searchParams.get("name");
    const {id}=useParams();
    const [postsById, setPostsById] = useState([])

    const fetchAllPostsById = async () => {
        const response = await fetch(`/api/users/${id}/posts`);
        const data = await response.json();
        setPostsById(data);
      };
    
      useEffect(() => {
        if(id) fetchAllPostsById();
      }, [id]);
  

  
  return (
    <Profile
        name={username}
        desc='welcome to  this profile page'
        data={postsById}
       
    />
  )
}

export default userProfile