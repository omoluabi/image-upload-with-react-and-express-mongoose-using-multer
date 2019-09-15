const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const Post = require('./models/post')
const mongoose = require('mongoose')

// connect to database
mongoose.connect('mongodb+srv://crudUser:crudPass@cluster0-fdmkk.mongodb.net/imageUploadDB?retryWrites=true', {useNewUrlParser: true,
useCreateIndex: true, useUnifiedTopology:true}, ()=>{
 console.log('Connected to the database');
})

//middlewres
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//multer for file upload
const multer  = require('multer')
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, './images'))
  },
  filename (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
const upload = multer({storage})

//create post with multiple images
app.post('/api/posts', upload.array('file', 3), (req, res)=>{
  console.log(req.files);
  const image = req.files.map(file=>{ //iterate over multiple files
    const img = fs.readFileSync(file.path);
    const encodeImage = img.toString('base64');
    const image = [{
      contentType: file.mimetype,
      image: Buffer.from(encodeImage, 'base64')
    }]
    return image
  })
  const {title, summary} = req.body
  Post.create({title, summary, image})
  .then(data =>res.json(data))
  .catch(err =>res.json(err))
})

//create post with one image
app.post('/api/post', upload.single('file'), (req, res)=>{
  const img = fs.readFileSync(req.file.path);
  const encodeImage = img.toString('base64');
  const image = [{
        contentType: req.file.mimetype,
        image: Buffer.from(encodeImage, 'base64')
  }]
  const {title, summary} = req.body
  Post.create({title, summary, image})
  .then(data =>{
    console.log(data);
    res.json(data)
  })
  .catch(err =>console.log(error))
})

//set-up view for production
if(process.env.NODE_ENV === 'production'){
	app.use(express.static('views/build'))
  app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, (req, res)=>{
  console.log(`App running on port ${PORT}`)
})
