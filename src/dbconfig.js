import mongoose from 'mongoose';

let cachedDB = global.cachedDB;

if (!cachedDB) {
  cachedDB = global.cachedDB = { conn: false};
}

const connectToDatabase = async () => {
  if (cachedDB.conn) {
    return true
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, { autoIndex: false })
    if(db.connections[0].readyState==1){
      console.log("Database connection successful");
      global.cachedDB.conn=true
    }
  } catch (error) {
    console.log(error)
    global.cachedDB.conn=false
    cachedDB.conn = false;
    throw error;
  }

  return cachedDB.conn;
};

export default connectToDatabase;
