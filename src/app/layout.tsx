
'use client'

import React, { ReactNode } from 'react';
import './globals.css'
import { Inter } from 'next/font/google'
import { useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({ children }: { children: ReactNode }) => {

  const pathname = usePathname();
         
  const { defaultAlgorithm, darkAlgorithm } = theme;
  
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    if(!darkMode){
      document.body.classList.add('dark-mode');
    } else {
    document.body.classList.remove('dark-mode');
    }
  };
  
  return (
    <>
 
      <html lang="en">
        <head>
          <title>GameChroma</title>
          <meta
          name="description"
          content={'Game Chroma is an online database of information related to games. Users can search for games and learn about games, as well as the cast of the game. It also provides ratings of games.'}
        />
        </head>

        <body className={inter.className} >
        
          <ConfigProvider
            theme={{
              algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
          }}>

            <nav className='navbar'>
              <ul>
                <li>
                  <Link href="/">
                    <span className={pathname === '/' ? 'active' : ''}>GameChroma</span>
                  </Link>
                </li>
            
              </ul>
            
              <FontAwesomeIcon
                icon={darkMode ? faSun : faMoon}
                style={{ fontSize: '24px', cursor: 'pointer' }}
                onClick={handleDarkMode}
              />
      
            </nav>

            {children}
        
          </ConfigProvider>

        </body>
      
      </html>

    </>
  
  );
};

export default RootLayout;
