const mongoose =  require('mongoose')
const USER_SCHEMA = new mongoose.Schema({
    UserName: String,
    Password: String,
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
    ProblemName: String,
    SubmissionID: String,
    TeamName: String,
    TimeStamp: String,
    Checked: Boolean,
    Correct: Boolean
})
const COMPETITION_SCHEMA = new mongoose.Schema({
    Name: String,
    CompetitionID: String,
    DateCreated: String,
    TimeLimit: Number,
    Admin: USER_SCHEMA,
    Judges: [JUDGE_SCHEMA],
    Teams :[TEAM_SCHEMA],
    Problems: [PROBLEM_SCHEMA],
    Submissions: [SUBMISSION_SCHEMA],
    Scoreboard: [SCOREBOARD_SCHEMA]
})
module.exports = {
    User: USER_SCHEMA,
    Competition: COMPETITION_SCHEMA
}