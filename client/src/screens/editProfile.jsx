
import React from "react"
import { useState,useRef } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import Header from "../components/header"
import Footer from "../components/footer"
import axios from "axios"
import { useAuth } from "../context/AuthContext"


const EditProfile = () => {
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const passverif=useRef("")
  const nameRef = useRef("")
  const passRef=useRef("")
  const onSubmit = async (data) => {
    try {
      // Verify the recent password
      if (passverif.current.value) {
        const verifyResponse = await axios.put(
          `${process.env.REACT_APP_API_URL}/user/verifyPassword`,
          { password: passverif.current.value }, // Pass the password in the body
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
  
        if (verifyResponse.data.error) {
          setError(verifyResponse.data.error);
          setIsError(true);
          return;
        }
      }
  
      // Prepare the new data
      const newData = {
        name: data.name || undefined, // Use the value from react-hook-form
        password: passRef.current.value || undefined, // Only include password if provided
      };
  
      // Remove undefined fields
      Object.keys(newData).forEach((key) => {
        if (newData[key] === undefined) {
          delete newData[key];
        }
      });
  
      // Update the profile
      await axios.put(
        `${process.env.REACT_APP_API_URL}/user/editProfile`,
        newData, // Pass the new data in the body
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
  
      setError("");
      setIsError(false);
      console.log("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setError("An error occurred while updating the profile.");
      setIsError(true);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div classname="flex flex-col min-h-screen">
        <Header/>
        <div className="bg-blue-100 flex min-h-screen items-center justify-center py-4">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md"
        >
            <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center mb-6 text-gray-800"
            >
            Edit Profile
            </motion.h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                Name
                </label>
                <input
                ref={nameRef}
                {...register("name", { required: "Name is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                value={user.name}
                id="name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </motion.div>
            { !user.googleId &&
            <>
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
                Recent Password
              </label>
              <input
                ref={passverif}
                {...register("password", {
                  minLength: { value: 8, message: "Password must be at least 8 characters" }, // Keep minLength validation if needed
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="password"
                id="password"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="new-password">
                New Password
              </label>
              <input
                ref={passRef}
                {...register("new password", {
                  minLength: { value: 8, message: "Password must be at least 8 characters" }, // Keep minLength validation if needed
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="password"
                id="new-password"
              />
              {errors["new password"] && <p className="mt-1 text-sm text-red-600">{errors["new password"].message}</p>}
            </motion.div>
            </>
            }

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
            >
                Update Profile
            </motion.button>
            </form>
        </motion.div>
        </div>
        <Footer/>
    </div>
  )
}

export default EditProfile

