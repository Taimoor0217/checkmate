const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const SOCKIO = require('socket.io')
const app = require('express')()
const http = require('http')
const schemas = require('./Schemas.js')
const multer = require('multer')
const server = http.createServer(app)
const io = SOCKIO(server)
const accounts = require('./accounts-generator.js')
var cors = require('cors'); 
let USERS = '', COMPETITION = ''
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, newFilename)
    }
});
const upload = multer({ storage });
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors())
mongoose.connect('mongodb+srv://Cmate-G8:Cmate123@cluster0-t7urq.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
    .then(() => {
        USERS = mongoose.model('USER', schemas.User)
        COMPETITION = mongoose.model('COMPETITION', schemas.Competition)
        io.on('connection', socket => {
            console.log('A CLIENT CONNECTED')
            socket.on('message', (d) => {
                console.log(socket.id, d)
            })
        })
        app.get('/checkcomp', (req, res) => {
            let name = req.query.Name
            USERS.findOne({ UserName: name }, (err, data) => {
                let comp = data.CompetitionID
                if (! comp ) {
                    res.send('404')
                    res.end()
                } else {
                    COMPETITION.findOne({ Name: comp }, (e, d) => {
                        const state = {
                            UserName: name,
                            Initial: false,
                            CompName: d.Name,
                            No_Teams: d.Teams.length,
                            No_Judges: d.Judges.length,
                            Duration: d.TimeLimit,
                            Teams: d.Teams,
                            Judges: d.Judges,
                            Problems: d.Problems,
                        }
                        res.send(state)
                        res.end()
                    })
                }
            })
        })
        app.post('/CompInitials', (req, res) => {
            // console.log('posted data')
            data = req.body
            USERS.updateOne({ UserName: data.UserName }, { CompetitionID: data.CompName }, (req, data) => {
                // console.log(data)
            })
            TEAMS_DATA = accounts.Generate(data.No_Teams, 'Team')
            JUDGES_DATA = accounts.Generate(data.No_Judges, 'Judge')
            COMPETITION.create({
                Name: data.CompName,
                DateCreated: String(Date.now()),
                TimeLimit: data.Duration,
                Admin: data.UserName,
                Judges: JUDGES_DATA[0],
                Teams: TEAMS_DATA[0],
                Problems: [],
                Submissions: [],
                Scoreboard: null
            })
            data.Initial = false
            data.Teams = TEAMS_DATA[0]
            data.Judges = JUDGES_DATA[0]
            res.send(data)
            res.end()

        })
        app.post('/NewTeam' , (req , res)=>{
            data = req.body
            Competition = data.Competition
            delete data.Competition
            COMPETITION.findOneAndUpdate(
                {Name:Competition},
                {$push :{Teams : data}}, (e , d)=>{
                    if(e){
                        console.log(e)
                    }else{
                        console.log(`A new Team added to DB ${Competition}`)
                    }
                })
            res.end()
        })
        app.post('/NewJudge' , (req , res)=>{
            data = req.body
            Competition = data.Competition
            delete data.Competition
            COMPETITION.findOneAndUpdate(
                {Name:Competition},
                {$push :{Judges : data}} , (e , d)=>{
                    if(e){
                        console.log(e)
                    }else{
                        console.log(`A new Judge added to DB ${Competition}`)
                    }
                })
            res.end()
        })
        // app.post('/DBFile', upload.single('SentFile'), (req, res) => {
        //     console.log(req.body)
        //     console.log(`A file saved uploades with name : ${req.file.orignalname}`)
        //     res.send(`File has been saved`);
        // });
        server.listen(8300, () => console.log('SERVER Listning On THE PORT'))
    })
    .catch((err) => console.log(err))