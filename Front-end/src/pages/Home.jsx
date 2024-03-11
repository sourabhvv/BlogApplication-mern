import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
function Home() {


  const [authors,setauthors] = useState([]);

   useEffect(() => {
    axios.get("http://localhost:5000/author/getAllAuthors")
      .then(response => {
        if (response.status === 201) {
           setauthors(response.data); 
         
        }
        // If the status is not 201, continue with setting authors
      })
      .catch(error => {
        console.error('Error fetching authors:', error);
        // Handle error
      });
  }, []);



  return (
    <div class="py-16">
    <div class="mx-auto px-6 max-w-6xl text-gray-500">
        <div class="text-center">
            <h2 class="text-3xl text-gray-950 dark:text-white font-semibold">All your  Faviourites Authors</h2>
            {/* <p class="mt-6 text-gray-700 dark:text-gray-300">Harum quae dolore inventore repudiandae? orrupti aut temporibus ariatur.</p> */}
        </div>
        <div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">


            

            {authors.map((author) => (
                
                <div key={author._id} class="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                <div aria-hidden="true" class="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-blue-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
                <div class="relative">
                    <div class="">
                       <img src={author.picture} alt="" srcset="" />
                      
                    </div>
                    <h2>{author.name}</h2>

                    <div class="mt-6 pb-6 rounded-b-[--card-border-radius]">
                        <p class="text-gray-700 dark:text-gray-300">{author.description}</p>
                    </div>

                    <div class="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
                        <Link to={`/profile/${author._id}`}  class="group rounded-xl disabled:border *:select-none [&amp;>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
                            <span>Go to Profile</span>
                            <div>🧑</div>
                        </Link>
                        {/* <a href="#" class="group flex items-center rounded-xl disabled:border *:select-none [&amp;>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 size-8 justify-center">
                            <span class="sr-only">Source Code</span>
                            <svg class="size-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"></path></svg>
                        </a> */}
                    </div>
                </div>
            </div>
                  ))}
   
  
           
           
        </div>
    </div>
</div>
  
  )
}

export default Home