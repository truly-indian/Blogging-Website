const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
   title:{
       type:String,
       required:true
   },
    details:{
    type:String,
    required:true
   },
    status:{
    type:String,
    default:public
    },
    allowComments:{
        type:Boolean,
        default:true
    },
    comments:[{
        commentBody:{
            type:String,
            required:true
        },
        commentDate:{
            type:Date,
            default:Date.now
        },
        commentUser:{
            type:Schema.Types.ObjectId,
            ref:'users'
        }
    }],
    image:{
        type:String,
    },
    user:{
        type:Schema.Types.ObjectId,
            ref:'users'
    },
    date:{
        type:Date,
        default:Date.now
    }

});

const Blog = mongoose.model('blog', blogSchema,'blogs');

module.exports = Blog;