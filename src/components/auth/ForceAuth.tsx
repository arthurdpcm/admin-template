import useAuth from "@/data/hook/useAuth"
import Image from "next/image"
import router from "next/router"
import loadingGif from "../../../public/loadingGif.gif"
import Head from "next/head"

export default function ForceAuth(props: any){

    const {user, loading} = useAuth()

    function renderContent(){
        return (
            <>
            <Head>
                <script
                    dangerouslySetInnerHTML={{
                        __html:`
                            if(!document.cookie?.includes("admin-template-arthur-auth")){
                                window.location.href = "/auth"
                            }
                        `
                    }}
                />
            </Head>
                {props.children}
            </>
        )
    }

    function renderLoading(){
        return(
            <div className={`
                flex justify-center items-center h-screen
            `}>
                <Image src={loadingGif} alt="Loading"/>
            </div>
            
        )
    }


    if(!loading && user?.email){
        return renderContent()
    } else if(loading){
        return renderLoading()
    } else {
        router.push("/auth")
        return null
    }
}