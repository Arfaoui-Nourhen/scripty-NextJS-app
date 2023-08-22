"use client"

import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState , useEffect } from 'react'

const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [postsById, setPostsById] = useState([])

    const fetchAllPostsById = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPostsById(data);
      };
    
      useEffect(() => {
        if(session?.user.id) fetchAllPostsById();
      }, []);
  

    const handleEdit=async (post)=>{
      router.push(`/update-post?id=${post._id}`)
      
    }
    const handleDelete=async (post)=>{
      const hadConfirmDelete = confirm(
        "you sure to delete ? you cant take it back "
      )
      if(hadConfirmDelete){
        try {
           await fetch(`/api/prompt/${post._id}`,{method: "DELETE"})
          //fetchAllPostsById();
          
        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
        } catch (error) {
          console.log(error.massage)
        }
    }
  }
  return (
    <Profile
        name='My'
        desc='welcome to your personalized profile page'
        data={postsById}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile