const express=require('express')
const app=express()
const mongoose=require('mongoose')
// const bodyParser=require('body-parser')
const postRoutes=require('./routes/Post')
const categoryRoutes=require('./routes/Categories')
const cors=require('cors')

const PORT=process.env.PORT || 8000;

// app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// database connection

mongoose.connect('mongodb://localhost:27017/blog')
        .then(()=>{
            console.log("database Connected..")
        })
        .catch(err=> console.log("Error Occured : "+err))


app.use('/api/posts',postRoutes)
app.use('/api/categories',categoryRoutes)

app.listen(PORT,()=>{
    console.log("server listening to PORT "+PORT)
})
