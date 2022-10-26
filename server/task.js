const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taskSchema = new Schema(
  {
    subject:{
      type:String,
      required:true,
    },
    issue:{
      type:String,
      required:true
    },
    history:[{
      type:Object
    }],
    owner:{
      type:String,
      required: true
    },
    notes:{
      type:String
    },
    deadline:{
      type:String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Task', taskSchema);
