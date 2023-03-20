import { createContext, useState,useEffect } from "react"

// type Theme = 'dark' | ''

interface AppContextProps{
    theme?: string
    changeTheme?: ()=> void
}

const AppContext = createContext<AppContextProps>({})


export function AppProvider(props: AppContextProps){

    const [theme, setTheme] = useState('')

    function changeTheme(){
        const newTheme =  theme === '' ? 'dark' : ''
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    useEffect(() => {
        const localTheme = localStorage.getItem('theme')
        setTheme(localTheme)
    
    }, [])
    

    return(
        <AppContext.Provider value={{
            theme: theme,
            changeTheme
        }}>
            {props.children}

        </AppContext.Provider>
    )
}



export default AppContext