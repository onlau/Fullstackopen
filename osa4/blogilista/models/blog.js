const { transform } = require('lodash')
const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    author: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    url: {
        type:String,
        required:true
    },
    likes: {
        type: Number,
        default: 0
    }
})

blogSchema.set("toJSON", {
    transform: (doc, returned) => {
        returned.id = returned._id.toString()
        delete returned._id
        delete returned.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)