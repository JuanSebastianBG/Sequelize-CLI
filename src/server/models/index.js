'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// Configuración de Sequelize (igual que antes)
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Función para cargar modelos tanto CommonJS como ES modules
async function loadModel(modelPath) {
  try {
    let modelModule = require(modelPath);
    
    // Si es ES module (export default)
    if (modelModule && modelModule.default) {
      return modelModule.default;
    }
    
    // Si es CommonJS
    return modelModule;
  } catch (err) {
    console.error(`Error cargando modelo ${modelPath}:`, err);
    return null;
  }
}

// Lista de modelos
const modelFiles = [
  'category', 'deliveryagent', 'order', 'orderproduct',
  'paymentdetail', 'product', 'productrating', 'rating',
  'role', 'rolerequest', 'seller', 'shippingdetail',
  'shippinghistory', 'store', 'user', 'userrating', 'cart'
];

// Cargar modelos
let modelDefiners = [];
for (const file of modelFiles) {
  const model = await loadModel(`./${file}`);
  if (model) modelDefiners.push(model);
}
// Definir cada modelo
modelDefiners.forEach(definer => {
  if (typeof definer === 'function') {
    const model = definer(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  } else {
    console.error('Modelo no válido:', definer);
  }
});

// Asociaciones (igual que antes)
Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

// Exportar
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Verificación y sincronización (igual que antes)
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión establecida');
    console.log('📋 Modelos:', Object.keys(db).filter(k => !['sequelize', 'Sequelize'].includes(k)));
    
    if (env === 'development') {
      await sequelize.sync({ alter: true });
      console.log('🔄 Modelos sincronizados');
    }
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
})();

module.exports = db;