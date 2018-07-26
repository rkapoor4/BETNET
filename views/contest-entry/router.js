import express from "express";
import Models from "../../models";
import { render, logedIn } from "../../util";

const router = express.Router()

router.get("/",logedIn,(req,res)=>{
	Models.ContestInstance.findAll({
    	include: [{
        	model: Models.Contest,
        	required: true,
        	attributes: ['entry_fee']
    	}]
	}).then((contestInstances)=>{
		let promises = []
		contestInstances.map((contestInstance)=>{
			promises.push(Models.Contestant.findAndCountAll({ where: { contest_instance_id: contestInstance.id } }))
		})
		Promise.all(promises).then((result)=>{
			let contests = contestInstances.map((instance,index)=>{
				return {
					id:instance.id,
					entry_fee: instance.Contest.entry_fee,
					contestant_count: result[index].count 
				}
			})
			return render(req,res,'contest-entry/view', { contests: contests })
		})
	})
})

router.post("/",logedIn,(req,res)=>{
	let p1 = Models.ContestInstance.findOne({
		where:{ id: req.fields.contest_instance_id }, 
		include: [{
        	model: Models.Contest,
        	required: true,
        	attributes: ['entry_fee']
    	}]
    })

	let p2 = Models.Contestant.findOne({ where: { user_id: req.user.id, contest_instance_id: req.fields.contest_instance_id } })
	let p3 = Models.User.findOne({ where: { id: req.user.id} })
	Promise.all([p1,p2,p3]).then((result)=>{
		let contestInstance = result[0]
		let contestant = result[1]
		let user = result[2]
		if(user.balance - contestInstance.Contest.entry_fee<0)
			return res.status(200).json({ code:0, message: 'you dont have enough balance to enter this contest' });
		if(!contestInstance)
			return res.status(200).json({ code:0, message: 'cant find this contest' });
		if(contestant)
			return res.status(200).json({ code:0, message: 'you have already enter this contest' });
		Models.sequelize.transaction(function (t) {

		  	return user.update({
				balance: user.balance - contestInstance.Contest.entry_fee
		  	}, { where:{}, transaction: t}).then(function (user) {
		    	return Models.Contestant.create({
					user_id: user.id,
					contest_instance_id: req.fields.contest_instance_id,
					balance: 1000
			  	}, {transaction: t});
		  	});

		}).then(function (result) {
			req.login(user,(err)=>{
				return res.status(200).json({ code:1, message: 'enter contest successed' });
			})
		}).catch(function (err) {
			return res.status(200).json({ code:0, message: 'an error occur' });
		});
	})
})

router.post("/contestants",logedIn,(req,res)=>{
	Models.Contestant.findAll({ 
		where: { contest_instance_id: req.fields.contest_instance_id },
		include: [{
        	model: Models.User,
        	required: true,
        	attributes: ['user_name']
    	}]
	})
	.then((contestants)=>{
		return res.status(200).json({ code:1, data:contestants });
	})
})

export default router