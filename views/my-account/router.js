import express from "express";
import { render, logedIn } from "../../util";

const router = express.Router()

router.get('/',logedIn,function (req, res) {
	return render(req,res,'my-account/view')
})

export default router