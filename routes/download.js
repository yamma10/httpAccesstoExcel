import express from 'express'
import access from '../component/connectAccess.js';

const router = express.Router();

// router.get('/', (req, res) => {
//     res.send("download/");
// })

router.get('/', (req, res) => {
    //
    res.send("H")
    const fName = req.query.filename;
    access(fName);
    console.log("download/" + fName);
})

export default router;