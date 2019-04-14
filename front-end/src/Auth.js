class Auth {
  constructor() {
    this.authenticated = false;
    this.competitionName = ''
    this.UserName = ''
    this.Role = ''

  }

  login(Role , Competition, Name , Password , cb1,  cb2) {
    this.Role = Role
    if(Name == "Taimoor0217" && Password == "Hello123" ){
        this.competitionName = Competition
        this.UserName = Name
        this.authenticated = true;
        cb1();
    }else{
        cb2();
    }
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