import express from 'express'
import access from '../component/connectAccess.js';
import writeExcel from '../component/writeExcel.js';

const router = express.Router();

// router.get('/', (req, res) => {
//     res.send("download/");
// })

router.get('/', async(req, res) => {
    //
    res.send("start")
    const fName = req.query.filename;
    const dt = await access(fName);
    
    writeExcel(dt);
})

export default router;