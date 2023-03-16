const express = require ("express")
const cors = require("cors")
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/home",{
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
.then(() => {
    console.log('MongoDB connection established.');
    })
    .catch(() => {
        console.log("MongoDB connection failed:");
    })

const postSchema = mongoose.Schema({
    title:String,
    description:String
})
const Post = mongoose.model("pots",postSchema)
app.get("/",(req,res)=>{
    res.send("hello ");

});
app.post("/create",(req,res)=>{
// console.log(req.body)
Post.create({
    title:req.body,
    description:req.body.description
}).then(doc => console.log(doc))
.catch(err => console.log(err));
});

app.get("/posts",(req,res)=>{
Post.find().then(items =>res.json(items)).catch(err=>console.log(err));
})

app.delete("/delete/:id",(req,res)=>{
// console.log(req.params)
Post.findByIdAndDelete({_id:req.params.id})
.then(doc => console.log(doc))
.catch(err => console.log(err));
})

app.put("/update/:id",(req,res)=>{
    // console.log(req.params)
    Post.findByIdAndUpdate({_id:req.params.id},{
    title:req.body.title,
    description:req.body.description
    }) .then(doc => console.log(doc))
    .catch(err => console.log(err));
}) ;

app.listen(5000 ,()=>{
    console.log("server running");
});