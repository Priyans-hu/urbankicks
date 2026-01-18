import config from '../config';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogMessage {
  level: LogLevel;
  message: string;
  context?: string;
  error?: Error;
  timestamp: string;
}

const formatMessage = (log: LogMessage): string => {
  const base = `[${log.timestamp}] [${log.level.toUpperCase()}]${log.context ? ` [${log.context}]` : ''}: ${log.message}`;
  if (log.error && config.nodeEnv !== 'production') {
    return `${base}\n${log.error.stack}`;
  }
  return base;
};

const shouldLog = (level: LogLevel): boolean => {
  if (config.nodeEnv === 'test') return false;
  if (config.nodeEnv === 'production' && level === 'debug') return false;
  return true;
};

const createLogEntry = (level: LogLevel, message: string, context?: string, error?: Error): LogMessage => ({
  level,
  message,
  context,
  error,
  timestamp: new Date().toISOString()
});

export const logger = {
  info: (message: string, context?: string): void => {
    if (shouldLog('info')) {
      const log = createLogEntry('info', message, context);
      console.log(formatMessage(log));
    }
  },

  warn: (message: string, context?: string): void => {
    if (shouldLog('warn')) {
      const log = createLogEntry('warn', message, context);
      console.warn(formatMessage(log));
    }
  },

  error: (message: string, error?: Error, context?: string): void => {
    if (shouldLog('error')) {
      const log = createLogEntry('error', message, context, error);
      console.error(formatMessage(log));
    }
  },

  debug: (message: string, context?: string): void => {
    if (shouldLog('debug')) {
      const log = createLogEntry('debug', message, context);
      console.log(formatMessage(log));
    }
  }
};

export default logger;
