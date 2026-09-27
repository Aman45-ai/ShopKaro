import app from "./src/app.js";

app.listen(process.env.PORT || 3000,"0.0.0.0",()=>{
  console.log(`Server running on port ${process.env.PORT || 3000}`)
})