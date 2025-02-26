import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full absolute bottom-0 bg-white mt-10 p-4 text-center text-gray-600 shadow-md">
      <p>© {currentYear} KIDOAI Tutor | Privacy Policy | Contact Us</p>
    </footer>
  );
};

export default Footer;

