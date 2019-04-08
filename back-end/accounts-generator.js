function Generate(no , opp){
    Accounts = []
    names = []
    for (i = 1 ; i <= no ; i++){
        if(opp == 'Judge'){
            Accounts.push({
                "UserName" : `${opp}${i}`,
                "Password" : `${opp}${i}`
            })
        }else{
            Accounts.push({
                "UserName" : `${opp}${i}`,
                "Password" : `${opp}${i}`,
                "Solved" :[],
                "Score" : 0
            })
        }
        names.push( `${opp}${i}`)
    }
    return [Accounts,names]
}
module.exports = {
    Generate : Generate
}