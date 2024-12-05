const express=require('express')
const Router=express.Router();
const Category=require('../models/Category.js')
const Post=require('../models/Post.js')


//get all post

Router.get('/',async(req,res)=>{
    try{
        const posts=await Post.find({})
        res.json(posts)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

//get a single post

Router.get('/:id',async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message: "Post not found.."})
        }
        res.json(post)
    }catch(error){
        res.status(500).json({message:error.message})
    }
})


//create a new post

Router.post('/',async(req,res)=>{

    const post= new Post({
    title:req.body.title,
    content:req.body.content,
    category:req.body.category,
    author:req.body.author,
    image:req.body.image
    })
    try{
        const newPost=await post.save();
        res.status(201).json(newPost)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})


//update a post

Router.put('/:id',async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        post.title=req.body.title || post.title
        post.content=req.body.content ||  post.content
        post.category=req.body.category||  post.category
        post.author=req.body.author || post.author
        post.image=req.body.image || post.image
        post.updatedAt=Date.now();
        
        const updatedPost=await post.save();
        res.status(200).json(updatedPost)
    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})


//delete post

Router.delete('/:id',async (req,res)=>{
    try{
        const post= await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        await Post.deleteOne({_id:post._id})
        res.json({message:"Post Deleted"})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})


//fetch post by  category


Router.get('/category/:categoryId',async(req,res)=>{
    try{
        const categoryId=req.params.categoryId;
        
        const categoryExists= await Category.findById(categoryId);
        if(!categoryExists){
            return res.status(400).json({message:"category does not exists"})
        }
        const posts=await Post.find({category:categoryId}).populate('category');
        res.status(200).json(posts)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

module.exports=Router;