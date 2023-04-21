
const express = require("express")
const jwt = require("jsonwebtoken")


const secretKey = "thisissecretkey"
const app = express()


app.get("/user", (req, res) => {
    res.json({
        message: "This is sample "
    })

})
app.post("/login", (req, res) => {
    const user = {
        name: "Rahul",
        id: 1,
        username: "rahulavashist",
        email: "rahul@gmail.com"
    }
    jwt.sign({ user }, secretKey,  (err, token) => {
        res.json(
            token
        )
    })
})
app.post("/profile", verifyToken, (req, res) => {

jwt.verify(req.token,secretKey,(err,authData)=>{
    if(err){
        res.send({result:"Invalid Request"})
    }
    else{
        res.json({
            message:"Profile Access",
            authData
        })
    }
})
})
 function verifyToken(req,res,next){
const bearerHeader=req.headers["authorization"]
if(typeof bearerHeader !=="undefined"){
    const bearer = bearerHeader.split(" ")
    const token = bearer[1]
    req.token = token
    next()
}
else{
    res.send({
        result:"UnAuthorized"
    })
}
 }


app.listen(80, () => { console.log(" server is running on server http://localhost:80") })