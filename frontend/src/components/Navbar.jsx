import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, TreeDeciduous, LogIn, LogOut } from 'lucide-react';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Woods', path: '/woods' },
    { name: 'CMS', path: '/cms' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const activeStyle = "text-cyan-400 font-semibold border-b-2 border-cyan-400 pb-1";
  const inactiveStyle = "text-slate-200 hover:text-cyan-400 transition-colors duration-200 pb-1";

  const activeMobileStyle = "block px-3 py-2 rounded-md text-base font-semibold text-cyan-400 bg-slate-800";
  const inactiveMobileStyle = "block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-all duration-200";

  const handleAuthAction = () => {
    if (isLoggedIn) {
      onLogout();
      navigate('/');
    } else {
      navigate('/login');
    }
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 shadow-lg border-b border-slate-800 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <TreeDeciduous className="h-8 w-8 text-cyan-400" />
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Mywoods
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6 items-baseline">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
            
            {/* Login / Logout Button */}
            <button
              onClick={handleAuthAction}
              className={`inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-semibold shadow-md transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer ${
                isLoggedIn
                  ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-900/20'
                  : 'bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-900 shadow-cyan-900/20'
              }`}
            >
              {isLoggedIn ? (
                <>
                  <LogOut className="mr-1.5 h-4 w-4" />
                  Logout
                </>
              ) : (
                <>
                  <LogIn className="mr-1.5 h-4 w-4" />
                  Login
                </>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-slate-900 border-t border-slate-800`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => (isActive ? activeMobileStyle : inactiveMobileStyle)}
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-4 pb-2 border-t border-slate-800 px-3">
            <button
              onClick={handleAuthAction}
              className={`w-full flex items-center justify-center px-4 py-2.5 rounded-lg text-base font-semibold shadow-md transition-all duration-200 ${
                isLoggedIn
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-900'
              }`}
            >
              {isLoggedIn ? (
                <>
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Login
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
