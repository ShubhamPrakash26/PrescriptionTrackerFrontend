import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#02294F] text-white pt-8 pb-4 px-2 sm:px-4 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8 md:gap-10 border-b border-white/20 pb-8">
        {/* Branding & Social */}
        <div className="flex-1 min-w-[180px] mb-6 md:mb-0">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold tracking-wider">MEDS<span className="text-cyan-400">UPERVISION</span></span>
              <svg width="32" height="20" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="10" width="30" height="4" rx="2" fill="#fff" />
                <circle cx="34" cy="12" r="4" fill="#fff" />
              </svg>
            </div>
          </div>
          <p className="mb-4 text-base sm:text-lg font-medium">Connect with us on social media using the links below.</p>
          <div className="flex gap-4 text-xl sm:text-2xl">
            <a href="http://www.medsupervision.in/comingSoon" aria-label="Facebook" className="hover:text-cyan-400"><i className="fab fa-facebook-f"></i></a>
            <a href="http://www.medsupervision.in/comingSoon" aria-label="Twitter" className="hover:text-cyan-400"><i className="fab fa-twitter"></i></a>
            <a href="http://www.medsupervision.in/comingSoon" aria-label="LinkedIn" className="hover:text-cyan-400"><i className="fab fa-linkedin-in"></i></a>
            <a href="http://www.medsupervision.in/comingSoon" aria-label="Instagram" className="hover:text-cyan-400"><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        {/* For Patients */}
        <div className="flex-1 min-w-[140px] mb-6 md:mb-0">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">For Patients</h3>
          <ul className="space-y-2 sm:space-y-3">
            <li className="flex items-center gap-2"><span className="text-cyan-400">»</span> <a href="http://www.medsupervision.in/comingSoon">Search for Experts</a></li>
            <li className="flex items-center gap-2"><span className="text-cyan-400">»</span> <a href="http://www.medsupervision.in/login">Login</a></li>
            <li className="flex items-center gap-2"><span className="text-cyan-400">»</span> <a href="http://www.medsupervision.in/register">Register</a></li>
            <li className="flex items-center gap-2"><span className="text-cyan-400">»</span> <a href="http://www.medsupervision.in/comingSoon">Booking</a></li>
            <li className="flex items-center gap-2"><span className="text-cyan-400">»</span> <a href="http://www.medsupervision.in/login">Patient Dashboard</a></li>
          </ul>
        </div>

        {/* For Experts */}
        <div className="flex-1 min-w-[140px] mb-6 md:mb-0">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">For Experts</h3>
          <ul className="space-y-2 sm:space-y-3">
            <li className="flex items-center gap-2"><span className="text-cyan-400">»</span> <a href="http://www.medsupervision.in/comingSoon">Appointments</a></li>
            <li className="flex items-center gap-2"><span className="text-cyan-400">»</span> <a href="http://www.medsupervision.in/comingSoon">Chat</a></li>
            <li className="flex items-center gap-2"><span className="text-cyan-400">»</span> <a href="http://www.medsupervision.in/login">Login</a></li>
            <li className="flex items-center gap-2"><span className="text-cyan-400">»</span> <a href="http://www.medsupervision.in/register">Register</a></li>
            <li className="flex items-center gap-2"><span className="text-cyan-400">»</span> <a href="http://www.medsupervision.in/loginExpert">Expert Dashboard</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Contact Us</h3>
          <div className="flex items-center gap-3 mb-2 sm:mb-3">
            <span className="text-xl sm:text-2xl"><i className="fas fa-phone-alt"></i></span>
            <span className="text-sm sm:text-base">+91 8368143240</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl"><i className="fas fa-envelope"></i></span>
            <span className="text-sm sm:text-base">medsupervision@gmail.com</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-6 text-xs sm:text-sm text-white/80 gap-2 md:gap-0">
        <div>© 2020 Medsupervision. All rights reserved.</div>
        <div className="flex gap-2 sm:gap-4 mt-2 md:mt-0">
          <a href="http://www.medsupervision.in/terms-and-conditions" className="hover:text-cyan-400">Terms and Conditions</a>
          <span>|</span>
          <a href="http://www.medsupervision.in/privacy-policy" className="hover:text-cyan-400">Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
