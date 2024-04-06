import React,{useState} from "react"
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';

function Register() {
  const [username,setUsername] = useState('')
  const [fullname,setFullname] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()


  // post data from frontend
  const handleRegisterForm = (e) => {
    e.preventDefault();
    axios
    .post("/api/v1/users/register",{
      fullName:fullname,username:username,email:email,password:password
    })
    .then((res) =>
    {
      formReset(e)
      console.log(res)
      console.log(res.data)
      console.log(res.data.data)
      navigate("/",{ state: { fullName: res.data.data.fullName } })
    }
    )
    .catch((error) => console.error(error));
  };
  
  // cleaning the field
  const formReset = (e)=>{
    e.preventDefault();
    setUsername("")
    setFullname("")
    setEmail("")
    setPassword("")
  }
  

  return (
    <>  
       <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
       
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
            <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required />
              </div>
              <div>
              <div>
                <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">FullName</label>
                <input type="fullname" value={fullname} onChange={(e)=>setFullname(e.target.value)} name="fullname" id="fullname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="fullname" required />
              </div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                </div>
              </div>
              <button onClick={(e)=>{handleRegisterForm(e);formReset(e);}} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Create an account
                </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? 
                <Link to="/login">
                <a href="#" className="font-medium text-primary-600 hover:underline dark:text-blue-500">Login here</a>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Register





  



