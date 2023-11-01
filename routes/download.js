import express from 'express'
import access from '../component/connectAccess.js';
import writeExcel from '../component/writeExcel.js';
import fs from "fs";
import { dirname, join } from "path"
import { fileURLToPath } from 'url';

const router = express.Router();

router.get('/', async(req, res) => {
    //

    const fName = req.query.filename;
    const flag = req.query.flag;
    console.log("flag = " + flag);
    const dt = await access(fName);
    
    if (dt == "not exist"){
        res.send("ファイルが存在しません");
        res.end();
        return;
    } else if(dt == "not select") {
        res.send("select文ではありません");
        res.end();
        return;
    }
    
    await writeExcel(dt,res);
    // await res.send("filename = "+ fName + "\n");
    // await res.send("flag = " + flag);
    await res.end();

    const curr = fileURLToPath(import.meta.url);
    const filePath = join(curr, '..', '..','sql', fName);
    console.log("filePath:" + filePath);
    if(flag == "1") {
        fs.unlink(filePath, (err) => {
            if(err) {
                console.log("ファイルの削除中にエラーが発生しました", err)
                return;
            } else {
                console.log("ファイルが正常に削除されました")
                return;
            }
        })
    }

})

export default router;