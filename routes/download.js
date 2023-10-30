import express from 'express'
import access from '../component/connectAccess.js';
import writeExcel from '../component/writeExcel.js';
import fs from "fs";
import { dirname, join } from "path"
import { fileURLToPath } from 'url';

const router = express.Router();

router.get('/', async(req, res) => {
    //
    res.send("start")
    const fName = req.query.filename;
    const flag = req.query.flag;
    console.log("flag = " + flag);
    const dt = await access(fName);
    
    await writeExcel(dt);
    
    const curr = fileURLToPath(import.meta.url);
    const filePath = join(curr, '..', '..','sql', fName);
    console.log("filePath:" + filePath);
    if(flag == "1") {
        fs.unlink(filePath, (err) => {
            if(err) {
                console.log("ファイルの削除中にエラーが発生しました", err)
            } else {
                console.log("ファイルが正常に削除されました")
            }
        })
    }
})

export default router;