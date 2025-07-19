enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

interface LogEntry {
  timestamp: string
  level: string
  message: string
  data?: any
  stack?: string
}

class Logger {
  private level: LogLevel
  private isDevelopment: boolean

  constructor() {
    this.level = process.env.NODE_ENV === "production" ? LogLevel.INFO : LogLevel.DEBUG
    this.isDevelopment = process.env.NODE_ENV === "development"
  }

  debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data)
  }

  info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data)
  }

  warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data)
  }

  error(message: string, data?: any): void {
    this.log(LogLevel.ERROR, message, data)
  }

  private log(level: LogLevel, message: string, data?: any): void {
    if (level < this.level) {
      return
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel[level],
      message,
      data,
    }

    if (level === LogLevel.ERROR && data?.stack) {
      entry.stack = data.stack
    }

    if (this.isDevelopment) {
      this.logToConsole(level, entry)
    } else {
      this.logToService(entry)
    }
  }

  private logToConsole(level: LogLevel, entry: LogEntry): void {
    const color = this.getLogColor(level)
    const prefix = `%c[${entry.level}] ${entry.timestamp}`

    console.log(prefix, color, entry.message, entry.data || "")

    if (entry.stack) {
      console.error(entry.stack)
    }
  }

  private logToService(entry: LogEntry): void {
    // In production, send logs to external service (e.g., Sentry, LogRocket)
    // For now, just use console
    console.log(JSON.stringify(entry))
  }

  private getLogColor(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG:
        return "color: #6b7280"
      case LogLevel.INFO:
        return "color: #3b82f6"
      case LogLevel.WARN:
        return "color: #f59e0b"
      case LogLevel.ERROR:
        return "color: #ef4444"
      default:
        return "color: inherit"
    }
  }
}

export const logger = new Logger()
