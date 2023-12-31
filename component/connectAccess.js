import fs from 'fs'
import 'dotenv/config'
import oledb from "oledb.js"

//Accessデータベースへの接続文字列
const connectionString = process.env.conn;


const access = async(path) => {
    console.log("access")
    let query;
    try {
        query = fs.readFileSync(process.cwd() + "\\sql\\" + path,'utf-8');
    } catch {
        return "not exist";
    }
    
    if(query.slice(0,6) != "select") {
        return "not select"
    }
    
    console.log("query : \n" + query);
    console.log("connectionString : " + connectionString)

    
    
    const db = await oledb.oledbConnection(connectionString);
    const tmp = await db.query(query);
    //console.log(tmp.result[0]);
    const dt = tmp.result[0]

    return dt;

};

export default access;