const express = require("express")
require("dotenv").config()
const cors = require("cors")
const mongoose = require("mongoose")
const Cashback = require("./model")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:false}))

app.get("/",(req,res) => {
    res.send("Hello")
})

app.post("/",async(req,res) => {
    const userId = req.body.id;
    const cashback = await Cashback.findOne({ title:"Cashback"})
    if(cashback){
       
        if(cashback.lastSmallWinner !== userId && (cashback.smallCashbackIndex+1)%5 === 0){
            cashback.lastSmallWinner = userId;
            await cashback.save()
            res.json({result:"Rs 5 Cashback!!"})
        }
        else if(cashback.lastLargeWinner !== userId && (cashback.largeCashbackIndex+1)%25 === 0){
            cashback.lastLargeWinner = userId;
            await cashback.save()
            res.json({result:"Rs 100 Cashback!!"})
        }
        else{
            res.json({result:"Better luck next time"})
        }
        cashback.smallCashbackIndex++;
        cashback.largeCashbackIndex++;
        await cashback.save()


    }
    else {
        await new Cashback({
            title:"Cashback",
            largeCashbackIndex:0,
            smallCashbackIndex:1,
            lastLargeWinner:"",
            lastSmallWinner:""
        }).save()
        res.json({result:"Better luck next time"})
    }

    
})

mongoose.connect(process.env.MONGO).then(() => console.log("mongoDB connected"))

app.listen(5000,() => console.log("server running at http://localhost:5000"))