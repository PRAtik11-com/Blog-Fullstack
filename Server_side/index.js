const express = require("express")
const connection = require("./config/db")
require ("dotenv").config()
const cors = require("cors")
var cookieParser = require('cookie-parser')
const userRouter = require("./routes/user.route")
const blogsrouter = require("./routes/blogs.route")



const app = express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.static("./uploads"))


app.use("/api/user",userRouter)
app.use("/api/blogs",blogsrouter)


app.listen(process.env.PORT || 9090 ,async() => {
    try {
        await connection
        console.log(`server is running on port ${process.env.PORT || 9090}`)
        console.log("connected to DB")
    } catch (error) {
        console.log(error);
        
    }
    
})