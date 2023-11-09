const { Schema,model} = require("mongoose")

const newSchema = new Schema({
    title:String,
    smallCashbackIndex:{ type:Number },
    largeCashbackIndex:{ type: Number },
    lastSmallWinner:String,
    lastLargeWinner:String
})

module.exports = model("Cashback",newSchema)