const express = require('express'), multer = require('multer'), path = require('path')
const app = express()
var cors = require('cors');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    // filename: (req, file, cb) => {
    //   const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    //   cb(null, newFilename);
    // },
  });
const upload = multer({ storage });
app.post('/', upload.single('selectedFile'), (req, res) => {
    console.log('Some thing Requested')
    res.send('File has been saved');
});
app.get('/' , (req , res)=>{
    console.log('Taken from API')
    res.send('Hello')
})
app.listen(8600 || "0.0.0.0", function(){
    console.log('Listing on the port....')
});