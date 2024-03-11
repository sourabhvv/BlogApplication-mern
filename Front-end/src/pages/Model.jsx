import {React,useState} from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Modal() {
  const [selectedFile,SetselectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [articleTitle,setarticleTitle] = useState("");
 
  const [description,setDescription] = useState("");

   const handleSubmit = async(e) =>{
    e.preventDefault();

    if(!articleTitle || !description ){

       toast.error('Please fill out all the for!', {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
           });
      return;
    }
    const formData = new FormData();
   
    formData.append('articleTitle', articleTitle);
    formData.append('description', description);
    
 
    await axios.post("http://localhost:5000/author/createArticles",{
      articleTitle:articleTitle,
      description:description
    },{
        headers: {
                     Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then(function(response){
      if(response.status==201){
            toast(`👌 ${response.data.message}!`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
           
        
           setShowModal(false);
      }
      }).catch(function(error){
           toast.error('😟 error occured!', {
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

     };
  
  return (
    <>
      <button
        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}>
       Add Article
      </button>

      <ToastContainer />

      {showModal ? (
        <>
          <div
            className="items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto  w-1/2">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                   Add new article
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form onSubmit={handleSubmit}>

                 <div className="relative p-4 flex-auto">
                   <div className="">
                   <div className="grid grid-cols-2 gap-9"></div>

                  

                 <div>
                  <label for="articleTitle" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">article Title</label>
                  <input type="text" name="articleTitle" value={articleTitle} onChange={(e)=>setarticleTitle(e.target.value)} id="articleTitle" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="article Title" required="true"/>
                 </div>
   
              
    
    <div>
      <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
      <textarea name="description" id="description" value={description}  onChange={(e)=>setDescription(e.target.value)} rows="3" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=" Description" required="true"></textarea>
    </div>

  </div>
</div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    value="submite"
                  >
                    Save Changes
                  </button>
                </div>
                </form>
              </div>
              
            </div>
          </div>
          
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
