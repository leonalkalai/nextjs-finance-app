import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

const useDarkMode = (defaultTheme = 'light') => {
  const [cookies, setCookie] = useCookies(['theme'])
  const [theme, setTheme] = useState(defaultTheme)

  // Initialize theme from cookie or default
  useEffect(() => {
    const initialTheme = cookies.theme || defaultTheme
    setTheme(initialTheme)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(initialTheme)
  }, [cookies.theme, defaultTheme])

  const setAndSaveTheme = (newTheme) => {
    setTheme(newTheme)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(newTheme)
    setCookie('theme', newTheme, { path: '/' })
  }

  const toggleTheme = () => {
    setAndSaveTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme }
}

export default useDarkMode