const axios = require('axios');
const processTypeService = require('../services/processType.service');
const crypto = require('crypto');
const cfgs = require('../config/auth.config');

const db = require("../models");

const generate = function () {
	return crypto.randomBytes(20).toString('hex');
};

const request = function (url, method, data) {
	return axios({ url, method, data, headers: {'auth-token': cfgs.JWT_USER}, validateStatus: false });
};

const cleanUpDatabase = function(){
    db.sequelize.sync({ force: true });
}

afterAll(() => {
    cleanUpDatabase();
});

test('Shall get process', async function () {

	const response = await request('http://localhost:3000/api/users', 'get');

    expect(response.status).toBe(200);

	const process = response.data;
	//then - então
    expect(process).toHaveLength(0);

});

