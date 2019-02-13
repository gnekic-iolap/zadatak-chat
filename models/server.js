import Sequelize from 'sequelize';

const sequelize = new Sequelize(
	'test',
	'test',
	'1234',
	{
		host: 'localhost',
		dialect : 'mysql'
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