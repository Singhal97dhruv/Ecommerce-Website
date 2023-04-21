const mongoose=require('mongoose');

// initialsing db
// const connect=()=>{
// main().catch(err => console.log(err));
 
// async function main() {
//     mongoose.set("strictQuery", false);
//   await mongoose.connect(process.env.DB_URI);
//   console.log(`Mongodb Connected with server`);
  
// }
// }
const connectDatabase=()=>{
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
  }).then((data)=>{
    console.log(`Mongodb connected with server: ${data.connection.host}`)
  })
}

module.exports=connectDatabase;