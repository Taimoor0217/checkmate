const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const SOCKIO = require('socket.io')
const app = require('express')()
const http = require('http')
const path = require('path')
const schemas = require('./Schemas.js')
const multer = require('multer')
const server = http.createServer(app)
const io = SOCKIO(server)
const uuidv4 = require('uuid/v4')
const accounts = require('./accounts-generator.js')
const spawn = require('./spawn')
const FileMaker = require('./FileMake')
var cors = require('cors'); 
SCOREBOARDS = []
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
mongoose.set('useFindAndModify', false);

function VerifySubmission_Automatically(req , res){
    COMPETITION.findOne({Name : req.body.Competition} , (e , d)=>{
        //SUBMISSIONS
        Problems = d.Problems
        target = ''
        for(i = 0 ; i < Problems.length ; i++){
            if(Problems[i].ProblemName === req.body.Problem){
                target = Problems[i]
            }
        }
        if(target === ''){
            res.send({
                result: "Incorrect",
                error : null
            })
            res.end()
        }else{
            const SObj ={
                Code_File_Path: `./${req.file.path}`,
                Input_File_Path : `./${target.Input_Path}`,
                Output_File_Path : `./${target.Output_Path}`,
                lang: 'python',
                checked: 0,
                result : 'Incorrect',
                output: null,
                error: null
            }
            // console.log(SObj)
            spawn.evalPython(SObj)
            .then((D)=>{
                // console.log(D)
                if(D.result === "Correct"){
                    let signal = false
                    COMPETITION.findOne({Name : req.body.Competition} , (error , data)=>{
                        if(data){
                            i = 0
                            for (i = 0 ; i < data.Teams.length ; i++){
                                if(data.Teams[i].UserName === req.body.Team){
                                    if(!data.Teams[i].Solved.includes(req.body.Problem)){
                                        COMPETITION.update(
                                            {Name:req.body.Competition , "Teams.UserName" : req.body.Team},
                                            {$push : {"Teams.$.Solved": req.body.Problem}}
                                        , (ERR , d)=>{
                                            if(ERR){
                                                console.log(ERR)
                                            }else{
                                                console.log('Submission Logged')
                                            }
                                        })   
                                        COMPETITION.update(
                                            {Name:req.body.Competition , "Teams.UserName" : req.body.Team},
                                            {$inc : {"Teams.$.Score": +10}}
                                        , (ERR , d)=>{
                                            if(ERR){
                                                console.log(ERR)
                                            }else{
                                                io.sockets.emit("FetchNewScoreboard" , {})
                                                console.log('Score Updated')
                                            }
                                        })   

                                    }
                                    break;
                                }
                            }
                        }else{
                            signal = true
                        }
                    })
                }else{
                    COMPETITION.update(
                        {Name:req.body.Competition , "Teams.UserName" : req.body.Team},
                        {$inc : {"Teams.$.Score": -0.2}}
                    , (ERR , d)=>{
                        if(ERR){
                            console.log(ERR)
                        }else{
                            io.sockets.emit("FetchNewScoreboard" , {})
                            console.log('Score Decreased')
                        }
                    })   
                }
                res.send({
                    result: D.result,
                    error : D.error
                })
                res.end()
            })
            .catch((e)=>{
                res.send({
                    result: "Incorrect",
                    error : null
                })
                console.log(e)
            })
        }
    })
}
mongoose.connect('mongodb+srv://Cmate-G8:Cmate123@cluster0-t7urq.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
    .then(() => {
        USERS = mongoose.model('USER', schemas.User)
        COMPETITION = mongoose.model('COMPETITION', schemas.Competition)
        io.on('connection', socket => {
            console.log('Connection')
            socket.on('message', (d) => {
                console.log(socket.id, d)
            })
        })
        app.get('/verifyparticipant' , (req , res)=>{
            // console.log(req.query)
            creds = req.query
            COMPETITION.findOne({ Name: creds.Competition }, (e, d) => {
                if(e){
                    res.send({
                        val : false,
                        message : "Invalid Competition Name!"
                    })
                    res.end()
                }else{
                    if(!d){
                        res.send({
                            val : false,
                            message : "Invalid Competition Name!"
                        })
                        res.end()
                    }else{
                        
                        var x = d[creds.Role]
                        // console.log(x)
                        var R = x.find(function(e){return (e.UserName == creds.UserName && e.Password == creds.Password)})
                        // console.log(R)
                        if(R && R.UserName == creds.UserName && R.Password == creds.Password){
                            res.send({
                                val : true,
                                message : "LogIn Successful"
                            })
                            res.end()
                        }else{
                            res.send({
                                val : false,
                                message : "Invalid UserName/Password"
                            })
                            res.end()
                        }
                    }
                    // console.log(creds.Role)
                }
            })
        })
        app.get('/verifyUser' , (req , res)=>{
            creds = req.query
            USERS.findOne({UserName : creds.UserName} , (e , d)=>{
                // console.log(e , d)
                if(!d){
                    res.send({
                        val : false,
                        message : "Invalid Competition Name!"
                    })
                    res.end()
                }else{
                    if(d && d.Password === req.query.Password){
                        res.send({
                            val : true,
                            message : "LogIn Successful"
                        })
                        res.end()
                    }else{
                        res.send({
                            val: false,
                            message : "Invalid UserName/Password"
                        })
                        res.end()
                    }
                }
            })
        })
        app.get('/TeamProblems' , (req , res)=>{
            data = req.query
            COMPETITION.findOne({Name : data.Competition} , (err , d)=>{
                if(err || !d){
                    console.log(err)
                    res.end()
                }else{
                    var Problems = d.Problems
                    var RESPONSE = []
                    var Team = d.Teams.find(function(e){return (e.UserName == data.TeamName)})
                    var solved = Team.Solved
                    for(i = 0 ; i < Problems.length ; i++ ){
                        var v = "UnSolved"
                        if(solved.indexOf(Problems[i].ProblemName) > -1){
                            v = "Solved"
                        }
                        RESPONSE.push({
                            Name: Problems[i].ProblemName,
                            Status: v
                        })
                    }
                    res.send(RESPONSE)
                    res.end()
                }
            })
        })
        app.get('/checkcomp', (req, res) => {
            let name = req.query.Name
            USERS.findOne({ UserName: name }, (err, data) => {
                if(err){
                    res.end()
                }else if(data !== null){
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

                }
            })
        })
        app.get('/ScoreBoard' , (req , res)=>{
            // console.log("HERE")
            let CompName = req.query.Competition
            COMPETITION.findOne({Name : CompName}, (e , d)=>{
                if(d){
                    Teams = d.Teams
                    // console.log(d.Teams)
                    return_list = []
                    for ( i = 0 ; i < Teams.length ; i++){
                        obj = {
                            TeamName : Teams[i].UserName,
                            Solved : Teams[i].Solved.length,
                            Score : Teams[i].Score
                        }
                        return_list.push(obj)
                    }
                    res.send({teams: return_list})
                    res.end()
                }else if(e || !d){
                    res.end()
                }
            })
        })
        app.get('/getPasswords' , (req , res)=>{
            COMPETITION.findOne({Name : req.query.Competition} , (e , d)=>{
                if(!e){
                    if(d){
                        Judges = d.Judges
                        Teams = d.Teams
                        Judges_Array = []
                        Teams_Array = []
                        for ( i = 0 ; i < Judges.length ; i++){
                            Judges_Array.push({
                                UserName : Judges[i].UserName,
                                Password : Judges[i].Password
                            })
                        }  
                        for ( i = 0 ; i < Teams.length ; i++){
                            Teams_Array.push({
                                UserName : Teams[i].UserName,
                                Password : Teams[i].Password
                            })
                        } 
                        const obj = {
                            Teams : Teams_Array,
                            Judges : Judges_Array
                        }
                        FileMaker.MakeCSV(obj)
                        .then(d=>{
                            res.download('./Passwords.csv' , (e , d)=>{
                                res.end()
                            })
                        })
                        .catch(e =>{
                            console.log(e)
                        })
                    }
                }else{
                    console.log(e)
                    res.end()
                }
            })
        })
        app.get('/getSubmissions' , (req , res)=>{
            // console.log('REUQQ')
            COMPETITION.findOne({Name : req.query.Competition} , (e , d)=>{
                if(e || !d){
                    res.end()
                }else{
                    Submissions = []
                    // console.log(d.Submissions)
                    for ( i = 0 ; i < d.Submissions.length ; i++){
                        if(d.Submissions[i].Status === "Unchecked"){
                            Submissions.push({
                                ProblemName : d.Submissions[i].ProblemName,
                                TeamName : d.Submissions[i].TeamName,
                                SubmissionID : d.Submissions[i].SubmissionID,
                                Status : "UnChecked"
                            })
                        }
                    }
                    // console.log(Submissions)
                    res.send(Submissions)
                    res.end()
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
        app.post('/SignUp' , (req , res)=>{
            data = req.body
            USERS.create({...data})
            res.send({})
            res.end()
        })
        app.post('/ProbInput', upload.single('InputFile'), (req, res) => {
            const fileinfo = {
                ProblemName : req.body.ProblemName,
                Input_Path : req.file.path,
                Output_Path : ''
            }
            // const filehash = req.file.filename
            COMPETITION.findOneAndUpdate(
                {Name: req.body.Competition},
                {$push :{Problems : fileinfo}} , (e , d)=>{
                    if(e){
                        console.log(e)
                    }else{
                        console.log(`A new File added to DB ${req.body.Competition}`)
                    }
                })
            res.send(`File has been saved`);
            res.end()
        });
        app.post('/ProbOutput', upload.single('OutputFile'), (req, res) => {
            COMPETITION.update(
                {Name:req.body.Competition , "Problems.ProblemName" : req.body.ProblemName},
                {$set : {"Problems.$.Output_Path": req.file.path}}
            , (e , d)=>{
                if(e){
                    console.log(e)
                }else{
                    res.send(`File has been saved`);
                    res.end()
                }
            })
        });
        app.post('/ProbSolution', upload.single('SubmittedFile'), (req, res) => {
            if(1){
                const sub = {
                    CompetitionName : req.body.Competition,
                    file_path : req.file.path,
                    ProblemName : req.body.Problem,
                    TeamName : req.body.Team,
                    TimeStamp : Date.now(),
                    Status : "Unchecked",
                    SubmissionID : uuidv4(),
                    Correct : false
                }
                COMPETITION.findOneAndUpdate({Name : req.body.Competition},
                {$push :{Submissions : sub}} , (e , d)=>{
                        if(e){
                            console.log(e)
                        }else{
                            console.log(`A Submission to ${req.body.Competition}`)
                            io.sockets.emit("FetchNewSubmissions" , {})
                        }
                })
            }else{
                VerifySubmission_Automatically(req , res)
            }
        });
        app.post('/removeTeam' , function(req , res){
            COMPETITION.updateOne({Name : req.body.Competition} , 
                {$pull: {Teams: {UserName: req.body.UserName}}} , function(ERR , data){
                    if(!ERR){
                        console.log("A team Removed from DB")
                        res.send({message : "ok"})
                        res.end()
                    }else{
                        console.log(ERR)
                        res.send({})
                        res.end()
                    }
                })
        })
        app.post('/removeJudge' , function(req , res){
            COMPETITION.updateOne({Name : req.body.Competition} , 
                {$pull: {Judges: {UserName: req.body.UserName}}} , function(ERR , data){
                    if(!ERR){
                        console.log("A Judge Removed from DB")
                        res.send({message : "ok"})
                        res.end()
                    }else{
                        console.log(ERR)
                        res.send({})
                        res.end()
                    }
                })
        })
        app.post('/removeProblem' , function(req , res){
            COMPETITION.updateOne({Name : req.body.Competition} , 
                {$pull: {Problems: {ProblemName: req.body.ProblemName}}} , function(ERR , data){
                    if(!ERR){
                        console.log("A Problem Removed from DB")
                        res.send({message : "ok"})
                        res.end()
                    }else{
                        console.log(ERR)
                        res.send({})
                        res.end()
                    }
                })
        })
        server.listen(8400, '0.0.0.0', () => console.log('SERVER Listning On THE PORT'))
    })
    .catch((err) => console.log(err))