const express = require('express');
const app = express();
const path = require("path");
const fs = require("fs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
    fs.readdir('./files',(err,files)=>{
        res.render("home.ejs", {files:files})
    })
})

app.post("/create",(req,res)=>{
    let filename = req.body.title.split(" ").join("_")
    fs.writeFile(`./files/${filename}.txt`,req.body.desc,(err)=>{
        res.redirect("/")
    })
})

app.get("/files/:filename",(req,res)=>{
    const filename = req.params.filename
    fs.readFile(`./files/${filename}`,'utf-8',(err,filedata)=>{
        res.render("show.ejs",{ filename: filename, file: filedata})
    })
})

app.get("/edit/:filename",(req,res)=>{
    const filename = req.params.filename
    res.render("edit",{filename})
})

app.post("/edit",(req,res)=>{
    console.log(req.body)
    fs.rename(`./files/${req.body.prevName}`,`./files/${req.body.newName}`,(err)=>{
        res.redirect("/")
    })
})

app.listen(3000,()=>{
    console.log("Server is running at http://localhost:3000")
})