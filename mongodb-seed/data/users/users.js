const { getObjectId } = require('../../helpers/index');

const users = [
	{
		id: getObjectId('admin'),
		username: 'Admin',
		role: 'ADMIN',
		password: 'secret',
	},
	{
		id: getObjectId('user1'),
		username: 'Homer',
		role: 'USER',
		password: 'secret',
	},
	{
		id: getObjectId('user2'),
		username: 'Marge',
		role: 'USER',
		password: 'secret',
	},
	{
		id: getObjectId('user3'),
		username: 'Bart',
		role: 'USER',
		password: 'secret',
	},
];

module.exports = users;
