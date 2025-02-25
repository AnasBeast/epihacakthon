import React from "react"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center fixed top-0 left-0 p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">KIDOAI Tutor</h1>
        <nav>
          <ul className="flex space-x-4 text-blue-500 font-semibold">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/challenges">Start Learning</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
      </header>
  )
}

export default Header

