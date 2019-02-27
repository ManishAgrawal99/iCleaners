//When we use next(err) in this file, we are making the error to be handled
// by the error handler in the app.js

const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const authenticate = require('../authenticate');
//authenticate file is imported to make the user access only the specified functionalities

//const cors = require('./cors');


//Importing the schema we created in the models folder
const Services = require('../models/services');

const serviceRouter = express.Router();

serviceRouter.use(bodyParser.json());

serviceRouter.route('/')
// .options(cors.corsWithOptions, (req, res) =>{
// 	res.sendStatus(200);
// })

//Setting up all the endpoints for the /services
.get((req,res,next) =>{
	//Here we are expecting to get all the services, so we need to find all the services in DB
	Services.find({})
	.then((services) =>{
		console.log(services);
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(services);
	},
	(err) =>{
		next(err);
	})
	.catch((err) =>{
		next(err);
	})
})

.post(authenticate.verifyUser,authenticate.verifyAdmin , (req,res,next) =>{
	//It will take the document to be posted from the body of the request
	Services.create(req.body)
	.then((service) =>{
		console.log('Service Created ', service);
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(service);
	},
	(err) =>{
		next(err);
	})
	.catch((err) =>{
		next(err);
	})	
})

.put(authenticate.verifyUser,authenticate.verifyAdmin , (req,res,next) =>{
	res.statusCode = 403;
	res.end('PUT operation not supported on /services');
})

.delete(authenticate.verifyUser,authenticate.verifyAdmin , (req,res,next) =>{
	Services.remove({})
	.then((resp) =>{
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(resp);
	},
	(err) =>{
		next(err);
	})
	.catch((err) =>{
		next(err);
	})
});



//Setting up all the endpoints for the /services/:serviceId

serviceRouter.route('/:serviceId')
.options((req, res) =>{
	res.sendStatus(200);
})

.get((req,res,next) =>{
	Services.findById(req.params.serviceId)
	.then((service) =>{
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(service);
	},
	(err) =>{
		next(err);
	})
	.catch((err) =>{
		next(err);
	})	

})

.post(authenticate.verifyUser,authenticate.verifyAdmin , (req,res,next) =>{
	res.statusCode = 403;
	res.end('POST operation not supported on /services/'+req.params.serviceId);
})

.put(authenticate.verifyUser,authenticate.verifyAdmin , (req,res,next) =>{
	Services.findByIdAndUpdate(req.params.serviceId,{
		$set: req.body
	}, {new: true})
	.then((service) =>{
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(service);
	},
	(err) =>{
		next(err);
	})
	.catch((err) =>{
		next(err);
	})

})

.delete(authenticate.verifyUser,authenticate.verifyAdmin , (req, res, next) => {
    Services.findByIdAndRemove(req.params.serviceId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = serviceRouter;
