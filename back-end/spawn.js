
// SDS DB
// PROBLEM: {     ProblemID : String,     Input_File_Path: String,     Output_File_Path: String }
// SUBMISSION: {     CompetitionName: String,     ProblemID: String,     SubmissionID: String,     TeamID: String,     Time: time,     Checked: bool } 

//Chnaged
// var SUBMISSION = {
//   // ProblemID: 'p1',     
//   Code_File_Path: './uploads/hello.py',
//   Input_File_Path: './uploads/in.txt',
//   Output_File_Path: './uploads/out.txt',
//   lang: 'python',
//   checked: 0,
//   result : 'Incorrect',
//   output: null,
//   error: null,
// } 

//func
function evalPython(subObj){
  
  return new Promise ((res, rej)=>{
    subObj.checked = 1

    const fs = require("fs");
    const spawn = require("child_process").spawn;
    let process = spawn(subObj.lang,[subObj.Code_File_Path]);
    
    let p_end = 1
    let compare = []
    let orignalOut = ""
    let userOut = ""
    
    fs.readFile(subObj.Output_File_Path, (_err, buf) => {
      orignalOut = buf.toString();
      // if (orignalOut[orignalOut.length-1]!="\r\n") orignalOut += "\r\n"

      if (orignalOut[orignalOut.length-1]=="\n") orignalOut = orignalOut.slice(0,orignalOut.length-1)

      //input
      fs.readFile(subObj.Input_File_Path, (_err, buf) => {
        process.stdin.write(buf.toString())
        process.stdin.end()
      });
    });
    
    //if no error
    process.stdout.on('data', (data) => {
      userOut+=(data.toString())
    });
    
    //if error
    process.stderr.on('data', (data) => {
      let err = data.toString().split("\n")
      subObj.error = err[err.length - 2]
      subObj.points = 0
      // console.log(subObj);
    });  
    
    // when process end
    process.on('exit', (code,signal) => {
      // console.log(code, signal)
      p_end = code
      clearTimeout(time)
      
      //only if no error
      if(code===0){
        userOut = userOut.split("\n")
        orignalOut = orignalOut.split("\n")
        
        //not cheking last line as it is an empty line
        for (let index = 0; index < orignalOut.length; index++) {
          
          u = userOut[index];
          o = orignalOut[index];
          
          (u === o) ? compare.push ([u,o,1]) : compare.push ([u,o,0])
        }

        //if output is not correct, points becomes zero
        compare.forEach(element => {
          if (element[2]===0){
            subObj.points = "Incorrect";
            return
          } else {
            subObj.result = "Correct"
          }
        });
        subObj.output = compare
      }
      // console.log(subObj);
      res (subObj);
    });
    
    
    //Time Limit Exceed
    time = setTimeout(() => { 
      process.kill()
      if (p_end != 0){
        subObj.error ="Time Limit Exceeded"
        subObj.points = 0

        // console.log(subObj);
        res (subObj);
      }
    }, 8000);
  });
}
module.exports.evalPython = evalPython

// evalPython(SUBMISSION).then(x => console.log(x))  