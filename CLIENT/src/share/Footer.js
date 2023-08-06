import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer d-print-none">
      <p>
        &copy; {new Date().getFullYear()} Appointment Management System. All
        rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
