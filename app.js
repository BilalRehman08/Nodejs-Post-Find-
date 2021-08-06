const { response } = require("express")
const e = require("express")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const postmodel = require("./schema")
const port = 5000;

app.use(express.json())
app.use(express.urlencoded({extended : true}))

mongoose.connect("mongodb+srv://admin:admin@cluster0.wmqa3.mongodb.net/user",
{     
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.post("/create",(request,response)=>{
    try {
    const body = request.body
    console.log(body)
    postmodel.create(body,(error,data)=>{
        if (error){
            throw error;
        }
        else{
            console.log(data)
            response.send("Created post Successfuly")
        }
    })    
    } catch (error) {
        response.send(`Error: ${error.message}`)
    }
})


app.get("/read",(request,response)=>{
    try {
    postmodel.find({},(error,data)=>{
        if (error){
            throw error;
        }
        else{
            console.log(data)
          
            response.send(data)
        }
    })    
    } catch (error) {
        response.send(`Error: ${error.message}`)
    }
})



app.get("/find",(request,response)=>{
    try {
        const {title} = request.headers
        const query = {}
        if (title){
            query.title = title
        }
        postmodel.find(query,(error,data)=>{
            if (error){
                throw error;
            }
            else{
                console.log(data)
                response.send(JSON.stringify(data))
            }
        })   
       
    
    } catch (error) {
        response.send(`Error: ${error.message}`)
    }
})





app.get("/findone",(request,response)=>{
    try {
        const {title} = request.headers
        const query = {title : title}
        if (query.title){
            postmodel.findOne(query,(error,data)=>{
                if (error){
                    throw error;
                }
                else{
                    console.log(data)
                    response.send(JSON.stringify(data))
                }
            })    
        }
    
    } catch (error) {
        response.send(`Error: ${error.message}`)
    }
})


mongoose.connection.on("connected",()=>console.log("Mongoose Connected"))
mongoose.connection.on("error",()=>console.log("Mongoose not connected"))

app.listen(port,()=>console.log(`Server is running on port: ${port}`))