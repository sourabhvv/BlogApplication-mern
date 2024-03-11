import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Model from './Model'
import Editprofile from '../components/Editprofile'



const initialAuthorState = {
  name: '',
  image: '',
  description: '',
  linkedin: ''
 
}; 


function fethcAuther(){
   useEffect(() => {
    axios.get("http://localhost:5000/author/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Include the bearer token
      }
    })
      .then(response => {
        if (response.status === 201) {
           setAuthor(response.data); 
          setisAuthorProfileSetup(true);
        }
        // If the status is not 201, continue with setting authors
      })
      .catch(error => {
        console.error('Error fetching authors:', error);
        // Handle error
      });
  }, []);
}


function Dashboard() {

  
const [authorData,setauthorData] = useState([]);
const [author, setAuthor] = useState(initialAuthorState);
const [isAuthorProfileSetup,setisAuthorProfileSetup] = useState(false);
const [articles,setarticles] = useState([]);

 useEffect(() => {
    axios.get("http://localhost:5000/author/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Include the bearer token
      }
    })
      .then(response => {
        if (response.status === 201) {
           setAuthor(response.data); 
          setisAuthorProfileSetup(true);
        }
        // If the status is not 201, continue with setting authors
      })
      .catch(error => {
        console.error('Error fetching authors:', error);
        // Handle error
      });
  }, []);

 useEffect(() => {
    axios.get("http://localhost:5000/author/articles", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Include the bearer token
      }
    })
      .then(response => {
        if (response.status === 201) {
           setarticles(response.data); 
          
        }
        
      })
      .catch(error => {
        console.error('Error fetching authors:', error);
        
      });
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor({ ...author, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/author/create",author,{
         headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Include the bearer token
        }
    }).then(function(response){
      
      if(response.status===201){
        
        setisAuthorProfileSetup(true);
        fethcAuther();
       
      }

    }).catch(function(error){
      console.log(error);
       toast.error('😟 invalid ', {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
           });
    });




    setAuthor(initialAuthorState);
    setisAuthorProfileSetup(true);

  };

  // Check if author profile is set up

   if (!isAuthorProfileSetup) {
    return (
     <div class="py-8 px-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
     <h3>Setup profile</h3>
  <form class="space-y-4" onSubmit={handleSubmit}>
    <div>
      <label class="block text-gray-700 font-semibold" htmlFor="name">Name:</label>
      <input class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="name" name="name" value={author.name} onChange={handleChange} required />
    </div>
    <div>
      <label class="block text-gray-700 font-semibold" htmlFor="image">Image URL:</label>
      <input class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="image" name="image" value={author.image} onChange={handleChange} required />
    </div>
    <div>
      <label class="block text-gray-700 font-semibold" htmlFor="description">Description:</label>
      <textarea class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" id="description" name="description" value={author.description} onChange={handleChange} required></textarea>
    </div>
   
    <div>
      <label class="block text-gray-700 font-semibold" htmlFor="linkedin">LinkedIn:</label>
      <input class="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="linkedin" name="linkedin" value={author.linkedin} onChange={handleChange} />
    </div>
    
    <button class="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" type="submit">Submit</button>
  </form>
</div>

    );
  }



  return (
    <div>
        <div class="py-16">
    <div class="mx-auto px-6 max-w-6xl text-gray-500">
        <div class="text-center">
        </div>
        <div class="mt">
          
            <div key={author.id} class="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                <div aria-hidden="true" class=""></div>
                <div class="relative">
                    <div class="flex items-center justify-center mb-1 md:mb-8">
                        <img class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" src={author.picture} alt={author.name} />
                    </div>
                    <div class="text-center">
                        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{author.name}</h5>
                        <span class="text-sm text-gray-500 dark:text-gray-400">{author.role}</span>
                        <div class="mt-4 md:mt-6 flex justify-center">
                           <Editprofile/>
                       
                        </div>
                    </div>
                </div>
                <div class="mt-2 pb-2 rounded-b-[--card-border-radius]">
                    <p class="text-gray-700 dark:text-gray-300">{author.description}</p>
                </div>
               
            </div>
           
        </div>
        <div className="mt-1">
      
        <div class="divide-y divide-gray-200 dark:divide-gray-700">

                    <div class="space-y-2 pb-8 pt-6 md:space-y-5">

                     
                        <p class="text-lg leading-7 text-gray-500 dark:text-gray-400">
                        Recent Articles</p> <Model/>
                        
                    </div>
                    
                    <ul class="divide-y divide-gray-200  dark:divide-gray-700">
                       
                    {articles.map((article) => (
                       <li class="py-12 relative group overflow-hidden p-3 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                       <article>
                           <div class="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                               <dl>
                                     Published on
                                   <dt class="sr-only">Published on</dt>
                                   <dd class="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">

                                       <time datetime="2023-08-05T00:00:00.000Z">{article.createdAt}</time>
                                    </dd>
                               </dl>
                           <div class="space-y-5 xl:col-span-3">
                               <div class="space-y-6"><div>
                                   <h2 class="text-2xl font-bold leading-8 tracking-tight"><a class="text-gray-900 dark:text-gray-100" href="/blog/release-of-tailwind-nextjs-starter-blog-v2.0">{article.title}</a></h2>
                                   <div class="flex flex-wrap">
                               
                                </div></div><div class="prose max-w-none text-gray-500 dark:text-gray-400">
                                   {article.description}
                                       </div></div><div class="text-base font-medium leading-6"><a class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400" aria-label="Read more: &quot;Release of Tailwind Nextjs Starter Blog v2.0&quot;" href="/blog/release-of-tailwind-nextjs-starter-blog-v2.0">Read more →</a></div></div></div>
                       </article>
                    </li>

                    ))}

                        

                    </ul>
         </div>
        
        </div>
    </div>
</div>

    </div>
  )
}

export default Dashboard