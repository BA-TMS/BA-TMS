import { NextRequest,NextResponse } from "next/server";
import { db } from "@/database.ts/connection";
import { getUsers } from "@/app/controllers/userControllers/getController";

export  async function GET (req:NextRequest){
 
    const  data = await getUsers()
  
 const response = NextResponse.json({
  data
 },{
    status:200
 })

 return response
}