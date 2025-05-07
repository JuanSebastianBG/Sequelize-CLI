import { Sequelize } from 'sequelize';
import config from '../config/database';

const sequelize = new Sequelize(config.development);

// Test connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Unable to connect to the database:', err));

export default sequelize;