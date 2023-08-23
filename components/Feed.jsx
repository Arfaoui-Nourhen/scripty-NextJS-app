"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import {  useRouter } from "next/navigation";

const PromptCardList = ({ data , handleTagClick ,handleUserCheckProfile}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((p) => (
        <PromptCard
          key={p._id}
          post={p}
          handleTagClick={handleTagClick}
          handleUserCheckProfile={handleUserCheckProfile} 
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const router = useRouter()
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFiltredData] = useState([]);
 
  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

 const filterPromptsFunction=(searchText)=>{
  const regex = new RegExp(searchText , "i")
  return allPosts.filter(
    (el) =>
    regex.test(el.creator.username) || regex.test(el.tag)  ||  regex.test(el.prompt ) 
  )
 }

 const handleUserCheckProfile=(id)=>{
  router.push(`/profile/${id}`)
 }

 const TimeToTakeBeforeShowTheResult=()=>{
  //to validate new  click
  setTimeout(() => {
    const data = filterPromptsFunction(searchText);
    setFiltredData(data)
  }, 5000);
  
 }
  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
     TimeToTakeBeforeShowTheResult()
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName)
    TimeToTakeBeforeShowTheResult()

  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {searchText ? 
        (
         <PromptCardList data={filteredData} handleTagClick={handleTagClick} handleUserCheckProfile={handleUserCheckProfile}/>):(
         <PromptCardList data={allPosts} handleTagClick={handleTagClick} handleUserCheckProfile={handleUserCheckProfile}/>
      )}
       
   
    </section>
  );
};

export default Feed;