const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true
},
  password: { 
    type: String, 
    required: true 
},
  instrument: { 
    type: String, 
},
  role: { 
    type: String, 
    enum: ['admin', 'player'], 
    default: 'player' 
}
});

module.exports = mongoose.model('User', userSchema);
