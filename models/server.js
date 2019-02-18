import Sequelize from 'sequelize';

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		dialect : process.env.DB_DIALECT,
	},
);

const db = {
	User: sequelize.import('./user'),
};

/*Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});*/

db.sequelize = sequelize;

export default db;