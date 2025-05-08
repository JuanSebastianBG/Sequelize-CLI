import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    
    if (isServer) {
      config.externals.push({
        'sequelize': 'commonjs sequelize',
        'mysql2': 'commonjs mysql2',
        'pg': 'commonjs pg',
        'pg-hstore': 'commonjs pg-hstore'
      });
      
      config.ignoreWarnings = [
        { module: /node_modules\/sequelize\/lib\/dialects\/abstract\/connection-manager\.js/ },
        { module: /node_modules\/mysql2\/index\.js/ }
      ];
    }
    
    return config;
  },
  
  experimental: {
    // Solo mantener los paquetes externos necesarios
    serverComponentsExternalPackages: ['sequelize', 'mysql2', 'pg', 'pg-hstore'],
    // serverActions ha sido removido porque ahora está habilitado por defecto
  },
  
  typescript: {
    ignoreBuildErrors: false,
  }
};

export default nextConfig;