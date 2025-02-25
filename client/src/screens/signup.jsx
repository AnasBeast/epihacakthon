import React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import Modal from "../components/modal"
import { useNavigate } from "react-router";
const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [apiResult, setApiResult] = useState("");
     
    const navigate = useNavigate();
    
    
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Simulated API call
    try {
      const response = await fetch(`http://localhost:3030/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await response.json()
      console.log("User signed up successfully:", data)
      setApiResult(data.message)
      setIsModalOpen(true)
      localStorage.setItem("token", data.user.token);
      setTimeout(() => {
        navigate("/");
      },1000);

    } catch (error) {
        console.error("Error signing up:", error)
    }
  }

  return (
    <div className="bg-blue-100 min-h-screen flex justify-center items-center">
    <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-md w-1/2 md:w-[400px] md:h-[600px] mx-auto p-10">
        <img src="/logo.png" alt="logo" className="mx-auto w-3/4" />
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Charles Leclerc"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="name@example.com"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="**********"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </motion.div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign up
        </motion.button>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">{apiResult}</pre>
    </Modal>
    </div>
  )
}

export default Signup

