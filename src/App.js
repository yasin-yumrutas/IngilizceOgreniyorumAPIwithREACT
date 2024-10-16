

import {Routes,Route, BrowserRouter } from "react-router-dom";
import {Home} from "./components/Pages/Home";
import {Calculation} from "./components/Pages/Calculation";
import {Contact} from "./components/Pages/Contact";

import { Link } from "react-router-dom";
import { useState } from "react";



export default function App() {
  return (
      
  
  <BrowserRouter>
     <Navbar />
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/calculation" element={<Calculation />} />
          <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>   
  

  );
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <span className="text-white text-2xl font-bold">My Website</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Ana Sayfa</Link>
              <Link to="/hakkimizda" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Hakkımızda</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">İletişim</Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
              <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isMenuOpen ? 'block' : 'hidden'} px-2 pt-2 pb-3 space-y-1 sm:px-3`}>
        <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Ana Sayfa</Link>
        <Link to="/hakkimizda" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Hakkımızda</Link>
        <Link to="/contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">İletişim</Link>
      </div>
    </nav>
  );
}
