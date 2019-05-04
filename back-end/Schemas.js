const mongoose =  require('mongoose')
const USER_SCHEMA = new mongoose.Schema({
    UserName: String,
    Password: String,
    EmailID : String,
    CompetitionID: String
})
const JUDGE_SCHEMA = new mongoose.Schema({
    UserName: String,
    Password: String
})
const TEAM_SCHEMA = new mongoose.Schema({
    UserName: String,
    Password: String,   
    Solved: [String],
    Score: Number
})
const SCOREBOARD_SCHEMA = new mongoose.Schema({
    CompetitionName: String,
    Scores:[{
        TeamName: String,
        Score: Number
    }]
})
const PROBLEM_SCHEMA = new mongoose.Schema({
    ProblemName: String,
    Input_Path: String,
    Output_Path: String
})
const SUBMISSION_SCHEMA = new mongoose.Schema({
    CompetitionName: String,
    file_path : String,
    ProblemName: String,
    SubmissionID: String,
    TeamName: String,
    TimeStamp: String,
    Status: String,
    Correct: Boolean
})
const COMPETITION_SCHEMA = new mongoose.Schema({
    Name: String,
    DateCreated: String,
    TimeLimit: Number,
    Admin: String,
    Judges: [JUDGE_SCHEMA],
    Teams :[TEAM_SCHEMA],
    Problems: [PROBLEM_SCHEMA],
    Submissions: [SUBMISSION_SCHEMA],
    Scoreboard: SCOREBOARD_SCHEMA,
    AutoJudge : Boolean
})
module.exports = {
    User: USER_SCHEMA,
    Competition: COMPETITION_SCHEMA
}