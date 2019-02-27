//This is where we will be creating a schema and model for the documents in the Services collection

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const serviceSchema = new Schema({
	name : {
		type: String,
		required: true,
		unique: true
	},
	description : {
		type: String,
		required: true
	},
	image:{
		type: String,
		required: true
	},
	price:[{
		type: Currency,
		required: true,
		min: 0
	}],
},{
	timestamps: true
});

var Services = mongoose.model('Service', serviceSchema);

module.exports = Services;