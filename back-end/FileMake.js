const { parseAsync } = require('json2csv');
const fs = require('fs')

const fileMaker = (data) => {

return new Promise(resolve => {

	const fields = [{label: "Judges Usernames", value: 'Judges.UserName'}, {label: "Judges Passwords", value: 'Judges.Password'}];
	const opts = { fields, unwind:['Judges'] };

	p = parseAsync(data, opts)

	dfile = 'Passwords.csv'

	  p.then(csv =>{
	  	fs.writeFile(dfile, csv, (err, data)=> {} )
	  }).then((name)=> {
	  	const fields = [{label: "Team Usernames", value: 'Teams.UserName'}, {label: "Team Passwords", value: 'Teams.Password'}];
		const opts = { fields, unwind:['Teams'] };
		parseAsync(data, opts).then(csv2=> fs.appendFile(dfile, "\n\n"+csv2, (err, data)=>  {
		resolve(name)
		}))
	  })
	})

}
module.exports = {
	MakeCSV : fileMaker
}