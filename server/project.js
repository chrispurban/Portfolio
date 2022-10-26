const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let projectSchema = new Schema(
  {
    address:{
      type:String,
      required:true
    },
    name:{
      type:String,
      required:true
    },
    tech:[{
      type:String
    }],
    desc:[{
      type:String
    }]
  },
  {
    timestamps:false
  }
);

module.exports = mongoose.model('Project', projectSchema);
