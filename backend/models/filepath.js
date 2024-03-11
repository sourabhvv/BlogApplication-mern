const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  imageName: {
    type: String
  },
  pathName: {
    type: String
  },
  userId: {

    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true

  },
  logicaLPath: {
    type: String
  }
}, { timestamps: true });

const File = mongoose.model('File', fileSchema);

module.exports = File;
