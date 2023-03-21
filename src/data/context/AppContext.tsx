import { createContext, useState,useEffect } from "react"

// type Theme = 'dark' | ''

interface AppContextProps{
    theme?: string
    changeTheme?: ()=> void
    children?: any
}

const AppContext = createContext<AppContextProps>({})


export function AppProvider(props: AppContextProps){

    const [theme, setTheme] = useState<string>('')

    function changeTheme(){
        const newTheme =  theme === '' ? 'dark' : ''
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    useEffect(() => {
        const localTheme = localStorage.getItem('theme')
        if(localTheme){
            setTheme(localTheme)
        }
    
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