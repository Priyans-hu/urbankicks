import dotenv from 'dotenv';
dotenv.config();

interface Config {
  port: number;
  dbPath: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  nodeEnv: string;
  allowedOrigins: string[];
}

const config: Config = {
  port: parseInt(process.env.PORT || '8080', 10),
  dbPath: process.env.DB_PATH || 'mongodb://localhost:27017/urbankicks',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  nodeEnv: process.env.NODE_ENV || 'development',
  allowedOrigins: [
    'http://localhost:8080',
    'http://localhost:3000',
    'https://urbankicks.onrender.com',
    'https://urbankicksatserver.onrender.com',
    'https://urbankicks.netlify.app'
  ]
};

// Validate required config
if (!config.jwtSecret) {
  console.error('FATAL: JWT_SECRET environment variable is not set');
  process.exit(1);
}

export default config;
