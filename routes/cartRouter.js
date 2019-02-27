//When we use next(err) in this file, we are making the error to be handled
// by the error handler in the ap.js

const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const authenticate = require('../authenticate');
//authenticate file is imported to make the user access only the specified functionalities

//const cors = require('./cors');


//Importing the schema we created in the models folder
const User = require('../models/user');

const cartRouter = express.Router();

cartRouter.use(bodyParser.json());

cartRouter.route('/')
// .options((req, res) =>{
// 	res.sendStatus(200);
// })

.get(authenticate.verifyUser, (req,res,next) =>{
    //Here we are expecting to get all the services in the cart for that user
    User.findOne({_id : req.user._id})
    .populate('cart')
    .then((user) =>{
		console.log(user);
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(user);
	},
	(err) =>{
		next(err);
	})
	.catch((err) =>{
		next(err);
	})
})

.post(authenticate.verifyUser, (req,res,next) =>{
	res.statusCode = 403;
	res.end('POST operation not supported on /cart/');
})

.put(authenticate.verifyUser, (req,res,next) =>{
	res.statusCode = 403;
	res.end('PUT operation not supported on /cart/');
})

.delete(authenticate.verifyUser, (req,res,next) =>{
	res.statusCode = 403;
	res.end('DELETE operation not supported on /cart/');
})

//Now, creating the end points for /users/cart/:serviceId

cartRouter.route('/:serviceId')
.options((req, res) =>{
	res.sendStatus(200);
})

.get(authenticate.verifyUser, (req,res,next) =>{
	res.statusCode = 403;
	res.end('GET operation not supported on /cart/' + req.params.serviceId);
})

.post(authenticate.verifyUser, (req,res,next) =>{
	User.findOne({_id: req.user._id})
	.then((user)=>{
			if(user.cart.indexOf(req.params.serviceId) == -1){
				user.cart.push({'_id': req.params.serviceId});
			}
			else{
				res.statusCode = 402;
				res.end('The service with id '+req.params.serviceId +' already exists in fav');
			}
			
			user.save()
			.then((user) =>{
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(user);
			},(err) =>{
				next(err);
			})
			.catch(
				err => next(err)
			);
		})
	.catch((err) =>{
		next(err);
	})	
	})


.put(authenticate.verifyUser, (req,res,next) =>{
	res.statusCode = 403;
	res.end('PUT operation not supported on /cart/' + req.params.serviceId);
})

.delete(authenticate.verifyUser, (req, res, next) => {
    User.findOne({_id: req.user._id})
	.then((user) =>{
		
		if (user == null) {
            err = new Error('No User found');
            err.status = 404;
            return next(err);
        }
		else{
			if (user.cart.indexOf(req.params.serviceId) === -1){
				err = new Error('Service ' + req.params.serviceId + ' not found index is coming -1');
                err.status = 404;
                return next(err);
			}
			user.cart.pull({'_id': req.params.serviceId});
			user.save()
			.then((user) =>{
				res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
			},(err) =>{
				next(err);
			})	
		}
	},
	(err) =>{
		next(err);
	})
    .catch((err) => next(err));
});



module.exports = cartRouter;
