import { Link } from "react-router-dom";
import { useAuthStore } from "../../context/useAuthStore.js";
import { LogOut, User, ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import medsupervisionLogo from '../../assets/medsupervision.png';

const navLinks = [
  { name: "Home", to: "http://www.medsupervision.in" },
  { name: "About Us", to: "http://www.medsupervision.in/about" },
];

const expertLinks = [
  { name: "Login", to: "http://www.medsupervision.in/loginExpert" },
  { name: "Register", to: "http://www.medsupervision.in/registerExpert" },
];

const patientLinks = [
  { name: "Search Doctors", to: "http://www.medsupervision.in/search-doctor" },
  { name: "Insurance Enquiry", to: "http://www.medsupervision.in/insurance" },
  { name: "Login", to: "http://www.medsupervision.in/login" },
  { name: "Register", to: "http://www.medsupervision.in/register" },
];

const blogLinks = [
  { name: "Health Care", to: "http://www.medsupervision.in/health-care" },
  { name: "Pregnancy Tips", to: "http://www.medsupervision.in/pregnancy-tips" },
  { name: "Nutrition", to: "http://www.medsupervision.in/nutrition" },
  { name: "Lung and Respiratory Care", to: "http://www.medsupervision.in/lung-and-respiratory-care" },
  { name: "Dental Care", to: "http://www.medsupervision.in/dental-care" },
];

const Dropdown = ({ label, children, mobile }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`relative ${mobile ? 'w-full' : ''}`}
      onMouseEnter={() => !mobile && setOpen(true)}
      onMouseLeave={() => !mobile && setOpen(false)}
    >
      <button
        className={`flex items-center gap-1 px-2 py-1 font-medium text-gray-800 hover:text-teal-400 focus:outline-none w-full ${mobile ? 'justify-between' : ''}`}
        onClick={() => mobile && setOpen((o) => !o)}
        type="button"
      >
        {label} <ChevronDown className="w-4 h-4" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`bg-white border border-gray-200 rounded shadow-lg z-50 ${mobile ? 'static w-full' : 'absolute left-0 mt-2 w-48'}`}
          >
            <div className="py-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [active, setActive] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="relative top-0 w-full bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 min-w-[120px]">
          <img src={medsupervisionLogo} alt="Medsupervision Logo" className="h-10 w-auto object-contain" />
        </Link>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden ml-2 p-2 rounded focus:outline-none"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
        {/* Center Nav Links (desktop) */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`text-lg font-medium px-2 transition-colors ${active === link.name ? "text-teal-400" : "text-gray-800 hover:text-teal-400"}`}
              onClick={() => setActive(link.name)}
            >
              {link.name}
            </Link>
          ))}
          <Dropdown label="Expert">
            {expertLinks.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-teal-500 text-base"
              >
                {item.name}
              </Link>
            ))}
          </Dropdown>
          <Dropdown label="Patient">
            {patientLinks.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-teal-500 text-base"
              >
                {item.name}
              </Link>
            ))}
          </Dropdown>
          <Dropdown label="Blogs">
            {blogLinks.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-teal-500 text-base"
              >
                {item.name}
              </Link>
            ))}
          </Dropdown>
        </nav>
        {/* Auth Buttons (desktop) */}
        <div className="min-w-[120px] hidden md:flex justify-end">
          {!authUser ? (
            <Link
              to="/login"
              className="border-2 border-teal-400 text-teal-400 font-semibold px-6 py-2 rounded-lg text-base hover:bg-teal-50 transition-all"
            >
              LOGIN <span className="mx-1">/</span> SIGNUP
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-b border-gray-200 shadow-sm px-4"
          >
            <nav className="flex flex-col gap-2 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className={`text-base font-medium px-2 py-2 rounded transition-colors ${active === link.name ? "text-teal-400" : "text-gray-800 hover:text-teal-400"}`}
                  onClick={() => { setActive(link.name); setMobileOpen(false); }}
                >
                  {link.name}
                </Link>
              ))}
              <Dropdown label="Expert" mobile>
                {expertLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-teal-500 text-base"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </Dropdown>
              <Dropdown label="Patient" mobile>
                {patientLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-teal-500 text-base"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </Dropdown>
              <Dropdown label="Blogs" mobile>
                {blogLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-teal-500 text-base"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </Dropdown>
              <div className="pt-2">
                {!authUser ? (
                  <Link
                    to="/login"
                    className="border-2 border-teal-400 text-teal-400 font-semibold px-6 py-2 rounded-lg text-base hover:bg-teal-50 transition-all block text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    LOGIN <span className="mx-1">/</span> SIGNUP
                  </Link>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/profile"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                      onClick={() => setMobileOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileOpen(false); }}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;