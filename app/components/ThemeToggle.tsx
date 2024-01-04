'use client';
import { useState } from 'react';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';

const themes = {
  winter: 'winter',
  forest: 'forest',
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(themes.forest);

  const toggleTheme = () => {
    const newTheme = theme === themes.forest ? themes.winter : themes.forest;
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };
  return (
    <button onClick={toggleTheme} className='btn btn-sm btn-outline'>
      {theme === 'forest' ? (
        <BsMoonFill className='h-4 w-4 text-primary'  />
      ) : (
        <BsSunFill className='h-4 w-4 text-primary'  />
      )}
    </button>
  );
};
export default ThemeToggle;
