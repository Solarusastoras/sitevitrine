import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Themes: 'minimaliste', 'luxe', 'urbain', 'eco', 'vintage'
  const [theme, setTheme] = useState('minimaliste');

  useEffect(() => {
    // Inject logic to modify root or body class if necessary. 
    // In our case we will render separate components, but assigning a body class can help for global resets
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
