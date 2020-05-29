module.exports = {
	PORT: process.env.PORT || '3001',
	MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost/psy-dev',
	JWT_SECRET: process.env.JWT_SECRET || 'some_string',
	MEMCACHED_HOST: process.env.MEMCACHED_HOST || 'localhost',
	MEMCACHED_PORT: process.env.MEMCACHED_PORT || '12345'
};