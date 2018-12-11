require('dotenv').config('./.env');
var helper = require('./helpers');

helper.createUsersJSON('./_input/datapool_users.csv','./_output/datapool_users.json');