import React, { useState, useEffect } from 'react';
import { MoonIcon } from "@heroicons/react/20/solid";
import { SunIcon } from "@heroicons/react/24/outline";

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    if(newTheme === "dark"){
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    setTheme(newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      // document.documentElement.setAttribute('data-theme', savedTheme);
      if(savedTheme === "dark"){
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if(theme === "dark"){
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme]);

  return (
    <>
      <label className="flex items-center cursor-pointer text-gray-700 dark:text-gray-200"> 
        <SunIcon className='h-5 w-5' strokeWidth={2} />
        {theme === 'dark'
          ? <input type="radio" name="toggle" className="hidden" checked={!(theme === 'dark') ? true : false} onChange={toggleTheme} />
          : <input type="radio" name="toggle" className="hidden" checked={theme === 'dark' ? true : false} onChange={toggleTheme} />
        }
        <div className={`w-10 h-5 rounded-full transition duration-300 ease-in-out flex items-center mx-2 p-0 ${theme === 'dark' ? 'bg-gray-300' : 'bg-blue-500'}`}>
          <div className={`w-5 h-5 rounded-full shadow-md transform scale-75 transition-transform ${theme === 'dark' ? 'translate-x-full bg-blue-500' : 'bg-gray-300'}`}></div>
        </div>
        <MoonIcon className='h-5 w-5' />
        {/* <span className="text-sm">{theme === 'dark' ? 'On' : 'Off'}</span> */}
      </label>
      {/* <button onClick={toggleTheme} className="px-4 py-2 bg-blue-500 text-white">
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button> */}
    </>
  );
};

export default ThemeToggle;