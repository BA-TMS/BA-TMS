import { db } from "@/database/connection"

export const getUsers =async ()=>{
try{
return  await db!.execute('SELECT * from person')
}catch(error){

}
}