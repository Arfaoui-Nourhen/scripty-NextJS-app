"use client";

import { useState , useEffect } from "react";
import {  useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const promptDetails = async () => {
    const response = await fetch(`/api/prompt/${promptId}`);
    const data = await response.json();
    setPost({
        prompt:data.prompt,
        tag:data.tag
    });
  };

  useEffect(() => {
    if (promptId) promptDetails();
  }, [promptId])
  

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!promptId) return alert("Missing PromptId!");
    try {
        const response= await fetch(
        `/api/prompt/${promptId}`,{
          method: "PATCH",
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
          }),
        }
      )
    
      if (response.ok) {
          router.push("/");
        }
     
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Form
      type='Update'
      post={post}
      setPost={setPost}
      submitting={isSubmitting}
      handleSubmit={handleUpdatePost}
    />
  );
};

export default UpdatePost;


