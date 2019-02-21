module.exports = {
	PORT: process.env.PORT || '3000',
	MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost/psy-dev',
	JWT_SECRET: process.env.JWT_SECRET || 'some_string'
};