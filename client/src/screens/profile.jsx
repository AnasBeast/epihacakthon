import React, { useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
const ProfilePage = () => {
    const token = localStorage.getItem("token");
    const [user, setUser] = React.useState({});
    useEffect(() => {
        const verifyUser = async () => {
            // Simulated API call
            try {
              const response = await fetch("http://localhost:3030/user/profile", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
              const data = await response.json()
              console.log("User logged in successfully:", data)
              setUser(data.user)
              
            } catch (error) {
              console.error("Error signing up:", error)
            }
        }
        verifyUser()
    },[]);
  

  return (
    <>
    <Header />


    <div className="flex justify-center items-center h-screen bg-blue-100">
      <div className="w-96 p-6 shadow-xl rounded-2xl bg-white">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe8TPVDfiXHE6Jnkw8i5OpagamJvPME4NmgA&s"} className="w-full h-full object-cover" alt={user.name} />
          </div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <div className="mt-4 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
            Score: {user.score}
          </div>
          <div className="flex gap-4 mt-4 justify-center items-center">
            Answers :
            <div className="bg-blue-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                {user.answers?.filter(answer => !answer.isvalid).length} ✅
            </div>
            <div className="bg-blue-100 text-red-700 px-4 py-2 rounded-full font-semibold">
                {user.answers?.filter(answer =>answer.isvalid).length} ❌
            </div>
          </div>
          <Link to="/edit-profile"
                className=" bg-indigo-600 text-white mt-6 py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
                
          >Edit Profile</Link>
        </div>
      </div>
    </div>

    <Footer />
    </>
  );
};

export default ProfilePage;
