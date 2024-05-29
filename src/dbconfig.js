import mongoose from "mongoose";

const connection = {connected:false}

const connectToDatabase = async ()=>{

  if(connection.connected!=false){
    return
  }

  try{
    if(!process.env.MONGODB_URI){
      throw new Error("MONGODB_URI is not passed")
    }
    const db = await mongoose.connect(process.env.MONGODB_URI,{autoIndex:false})
    if(db.connections[0].readyState!=0){
      connection.connected=true
    }
  }catch(error){
    console.log(error)
    process.exit()
  }
}



export default connectToDatabase