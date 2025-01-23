import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

interface FormData {
  name: string
  email: string
  address: string
  phone_no: string
  password: string
}

interface SignupResponse {
  token: string;
  id: string;
}

const SignupPage: React.FC = () => {


  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [userId, setUserId] = useState("");


  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    address: "",
    phone_no: "",
    password: "",
  })

  const RedirectLogin = () => {
    navigate("/login");
  }

  const HandleProfile = () => {
    navigate(`/profile/ ${userId}`);
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

      const response = await axios.post<SignupResponse>("http://localhost:3000/signup", formData);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

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
          <h2 className="text-2xl font-bold mt-4 text-gray-800">Sign Up Successful!</h2>
          <p className="mt-2 text-gray-600">Welcome aboard, {formData.name}!</p>
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
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-base font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name here "
              required
              className="mt-1 block w-full rounded-md py-2 pl-3 text-base text-bold border-2 border-gray-200 "
              value={formData.name}
              onChange={handleChange}
            />
          </div>
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
            <label htmlFor="address" className="block text-base font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address here :- "
              required
              className="mt-1 block w-full rounded-md py-2 pl-3 text-base text-bold border-2 border-gray-200 "
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-base font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_no"
              name="phone_no"
              placeholder="Phone no  here :- "
              required
              className="mt-1 block w-full rounded-md py-2 pl-3 text-base text-bold border-2 border-gray-200 "
              value={formData.phone_no}
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
            {isLoading ? "Signing up..." : "Sign Up"}
          </motion.button>
        </form>
        <div className="text-gray-600 text-base flex justify-center mt-3 ">Already a User ? <p onClick={RedirectLogin} className="ml-1 underline text-gray-900 cursor-pointer"> Login here </p></div>
      </motion.div>
    </div>
  )
}

export default SignupPage;

