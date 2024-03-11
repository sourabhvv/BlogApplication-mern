import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialAuthorState = {
  name: '',
  picture: '',
  description: '',
  contact: ''
};

export default function Editprofile() {
  const [showModeledit, setshowModeledit] = useState(false);
  const [author, setAuthor] = useState(initialAuthorState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!author.name || !author.description) {
      toast.error('Please fill out all the fields!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/author/update", author, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.status === 201) {
        toast(`👌 ${response.data.message}!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        
        setshowModeledit(false);
      }
    } catch (error) {
      toast.error('😟 An error occurred!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }
  };

  return (
    <>
      <button
        className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        type="button"
        onClick={() => setshowModeledit(true)}
      >
        Edit profile
      </button>

      {showModeledit && (
        <>
         <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 z-40">
  <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg overflow-hidden">
    <div className="px-6 py-4 border-b border-blueGray-200 bg-blueGray-100">
      <h3 className="text-2xl font-semibold">Edit Profile</h3>
      <button className="text-black opacity-50 ml-auto focus:outline-none" onClick={() => setshowModeledit(false)}>
        <span className="text-2xl">×</span>
      </button>
    </div>
    <form className="p-6 space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-700 font-semibold" htmlFor="name">Name:</label>
        <input className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="name" name="name" value={author.name} onChange={handleChange} required />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold" htmlFor="image">Image URL:</label>
        <input className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="image" name="image" value={author.picture} onChange={handleChange} required />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold" htmlFor="description">Description:</label>
        <textarea className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" id="description" name="description" value={author.description} onChange={handleChange} required></textarea>
      </div>
      <div>
        <label className="block text-gray-700 font-semibold" htmlFor="linkedin">LinkedIn:</label>
        <input className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="linkedin" name="linkedin" value={author.contact} onChange={handleChange} />
      </div>
      <div className="flex justify-between">
        <button className="text-red-500 font-bold uppercase" type="button" onClick={() => setshowModeledit(false)}>Close</button>
        <button className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" type="submit">Submit</button>
      </div>
    </form>
  </div>
</div>

        </>
      )}
    </>
  );
}
