import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

interface FormData {
  email: string
  password: string
}

interface SignupResponse {
  token: string;
  id: string;
}

const LoginPage: React.FC = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  })

  const RedirectSignup = () => {
    navigate("/signup");
  }

  const HandleProfile = () => {
    navigate(`/profile/${userId}`);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      console.log(formData);

      const response = await axios.post<SignupResponse>("https://demo-app-mevb.onrender.com/login", formData);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      console.log(response.data.id);
      setUserId(response.data.id);
      setIsSuccess(true)
    }
    catch (err) {
      console.error("Error during signup:", err);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 via-pink-100 to-red-100">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-lg text-center"
        >
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
          <h2 className="text-2xl font-bold mt-4 text-gray-800">Login Successful!</h2>
          <p className="mt-2 text-gray-600">Welcome aboard,!</p>
          <button onClick={HandleProfile} className="bg-green-300 rounded-xl px-3 py-2 text-base font-semibold font-mono text-gray-700 mt-3 cursor-pointer">Got to profile Page</button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter E-mail here"
              required
              className="mt-1 block w-full rounded-md py-2 pl-3 text-base text-bold border-2 border-gray-200 "
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-base font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Set password :- "
              required
              className="mt-1 block w-full rounded-md py-2 pl-3 text-base text-bold border-2 border-gray-200 "
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "logging in..." : "Login"}
          </motion.button>
        </form>
        <div className="text-gray-600 text-base flex justify-center mt-3 ">Not a User ? <p onClick={RedirectSignup} className="ml-1 underline text-gray-900 cursor-pointer"> Signup here </p></div>
      </motion.div>
    </div>
  )
}

export default LoginPage;

