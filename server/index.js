const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
const {encrypt,decrypt} = require("./EncryptionHandler")
const PORT = 9000
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "adithyavinod123",
    database: "PasswordManager"
})

app.post("/addpassword",(req,res)=>{
    const {password,title} = req.body
    const hashedPassword = encrypt(password)
    db.query("INSERT INTO passwords(password,title,iv) VALUES(?,?,?)",[hashedPassword.password,title,hashedPassword.iv],(err,result)=>{
        if(err){
            console.log(err.message)
        }else{
            res.send("Successfully stored")
        }
    })
})
app.get("/showpassword",(req,res)=>{
    db.query("SELECT * FROM passwords;",(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.post("/decryptpassword",(req,res)=>{
    res.send(decrypt(req.body))
})

app.listen(PORT, ()=>{
    console.log("Server started")
})