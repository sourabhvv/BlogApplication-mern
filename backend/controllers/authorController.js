const userModel = require("../models/auther")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const autherModel = require("../models/auther");
const articlesModel = require("../models/article");


const SECRET_KEY = 'Task'



const getAuthor = async (req, res) =>{
    
    const existingAuther = await autherModel.findOne({ userId: req.userId })
    if(!existingAuther){
        return res.status(404).json({ message: "user not found  " })
    }

    try{
      
        res.status(201).json(existingAuther);
    }catch(err){
        res.status(500).json({ message: "something went wrong " });

    }

}
const getAuthorbyId = async (req, res) => {
    try {
        const existingAuthor = await autherModel.findOne({ _id: req.params.id });
        if (!existingAuthor) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(201).json(existingAuthor);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
}


const getAllAuthors = async (req, res) => {
    try {
        const authors = await autherModel.find();
        if (!authors || authors.length === 0) {
            return res.status(404).json({ message: "No authors found" });
        }
        res.status(201).json(authors);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}


const createAuthor = async (req,res) =>{
    
  
    const {name,image,description,linkedin} = req.body;
    const newAuther = await autherModel.create(
        {
            name:name,
            userId: req.userId,
            picture:image,
            description:description,
            contact:linkedin,
        }
    );

    try{
        await newAuther.save();
        res.status(201).json(newAuther);
    }catch(err){
        res.status(500).json({ message: "something went wrong " });

    }



}

const updateAuthor = async (req, res) => {
    const { name, image, description, linkedin } = req.body;
    try {
        const existingAuthor = await autherModel.findOneAndUpdate(
            { userId: req.userId },
            { name, picture: image, description, contact: linkedin },
            { new: true }
        );

        if (!existingAuthor) {
            return res.status(404).json({ message: "Author not found" });
        }

        res.status(201).json({ message: "Profile updated" });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
}





const createArticles = async (req,res)=>{
    const {articleTitle,description} = req.body;
    const newArticle = await articlesModel.create(
       {
         title:articleTitle,
         description:description,
         userId:req.userId,
       }
    )

    try{
      await newArticle.save()
      res.status(201).json({ message: "article created" });
    }
    catch(err){
        res.status(500).json({ message: "something went wrong " });

    }

}

const getArticles = async (req,res)=>{
    const Articles = await articlesModel.find({ userId: req.userId });
    if(!Articles){
        return res.status(404).json({ message: "no article found" });
    }

    res.status(201).json(Articles);

}

const getArticlesbyID = async (req,res)=>{

    const auther = await autherModel.findOne({ _id: req.params.id });
    const Articles = await articlesModel.find({ userId: auther.userId });
    if(!Articles){
        return res.status(404).json({ message: "no article found" });
    }

    res.status(201).json(Articles);

}

const getallArticles = async (req, res) => {
    try {
        const Articles = await articlesModel.find();
        if (!Articles) {
            return res.status(404).json({ message: "No articles found" });
        }

        const articlesData = await Promise.all(Articles.map(async article => {
            const existingAuthor = await autherModel.findOne({ userId: article.userId });

            return {
                _id: article._id,
                title: article.title,
                description: article.description,
                image: existingAuthor.picture,
                author: existingAuthor.name,
                createdAt: article.createdAt
            };
        }));

        res.status(201).json(articlesData);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}








module.exports = { createAuthor, getAuthorbyId,getArticlesbyID,getallArticles,getAuthor,getAllAuthors,createArticles,getArticles,updateAuthor}