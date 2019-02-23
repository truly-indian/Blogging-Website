const multer = require('multer')
module.exports = {
    storage: multer.diskStorage({}),
    fileFilter: (req,file,cb) => {
        if(!file.mimetype.match(/jpg|jpeg|png|gif$i/))       
         {
             cb(new Error('file format not supported'),false)
             return
         }
        cb(null,true)
    }
}