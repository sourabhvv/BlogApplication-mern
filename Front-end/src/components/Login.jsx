import axios from 'axios';
import {useState,React} from 'react'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {

  const [email,SetEmail] = useState("");
  const [password,SetPassword] = useState("");
  
  async function handleSubmit(event){

    event.preventDefault();

    await axios.post("http://localhost:5000/users/signing",{
      password:password,
      email:email,
    }).then(function(response){
      
      if(response.status===201){

        localStorage.setItem('id',response.data.user._id);
        localStorage.setItem('username',response.data.user.username);
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('email',response.data.user.email);


        window.location.href = '/dashboard';
       
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

  }


  return (

    <div className='bg-gray-100 min-h-screen p-4 py-12 '>
      <div className='scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe focus:outline focus:outline-2 focus:outline-red-500' >
       <div className='flex justify-center items-center '>
       <ToastContainer />
        
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">

       <img class="" src="" alt="Your Company"/>
        </div> 
       </div>
       <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
               <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign  in to your account</h2>

    <form class="space-y-4"  method="POST" onSubmit={handleSubmit} >
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input id="email" name="email" type="email" value={email} onChange={(e)=> SetEmail(e.target.value)} autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div class="mt-2">
          <input id="password" name="password" value={password} onChange={(e) => SetPassword(e.target.value)} type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
       
        <button type="submit" class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                     Create an account? <Link to="/SignUp" class="font-medium text-primary-600 hover:underline dark:text-primary-500">SignUP</Link>
        </p>
      </div>
     </form>
    </div>
     </div>

    </div>
  )
}

export default Login