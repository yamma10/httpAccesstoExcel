import fs from 'fs'
import 'dotenv/config'
import oledb from "oledb.js"

//Accessデータベースへの接続文字列
const connectionString = process.env.conn;


const access = async(path) => {
    console.log("access")
    const query = fs.readFileSync(process.cwd() + "\\sql\\" + path,'utf-8');
    console.log("query : \n" + query);
    console.log("connectionString : " + connectionString)
    
    const db = oledb.oledbConnection(connectionString);
    db.query(query)
    .then(result => {
        console.log(result);
    })

};

export default access;