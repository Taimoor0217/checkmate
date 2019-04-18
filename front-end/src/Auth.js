import axios from 'axios'
// import Judge from './Judge';
import LINK from './link'
class Auth {
  constructor() {
    this.authenticated = false;
    this.competitionName = ''
    this.UserName = ''
    this.Role = ''
  }
  loginAdmin(UserName , Password , cb1 , cb2){
    axios.get(LINK + 'verifyUser' , {
      params:{
          UserName : UserName,
          Password : Password
      }
    })
    .then(d =>{
      if(d.data.val === true){
        this.UserName = UserName
        this.authenticated = true
        cb1()
      }else{
        cb2(d.data.message)
      }
    })
    .catch(()=>{
      
    })
  }
  login(Role , Competition, Name , Password , cb1,  cb2) {
    this.Role = Role
    axios.get(LINK + 'verifyparticipant' , {
      params:{
          Competition : Competition,
          Role : Role,
          UserName : Name,
          Password : Password
      }
    })
    .then(d =>{
      if(d.data.val === true){
        this.competitionName = Competition
        this.UserName = Name
        this.Role = Role
        this.authenticated = true
        cb1()
      }else{
        cb2(d.data.message)
      }
    })
    .catch(()=>{
      
    })
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();