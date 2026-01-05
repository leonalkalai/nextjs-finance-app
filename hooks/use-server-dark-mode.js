// import { cookies } from 'next/headers'

// const useServerDarkMode = (defaultTheme = 'dark') => {
//   return cookies().get('theme')?.value ?? defaultTheme
// }

// export default useServerDarkMode

import { cookies } from 'next/headers'

const useServerDarkMode = async (defaultTheme = 'light') => {
  const cookieStore = await cookies()
  return cookieStore.get('theme')?.value ?? defaultTheme
}

export default useServerDarkMode