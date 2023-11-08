"use client"

import { ReactNode, useEffect } from "react"
//import { databaseConnection } from "@/database/connection"

interface Iprop {
    children  : ReactNode
}

const AppProvider = ({children}:Iprop)=>{

    useEffect(()=>{
       //databaseConnection()
    },[])

    return <>{children}</>
}

export default AppProvider