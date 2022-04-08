import util from 'util'

type DebugObject = Record<string, unknown>

type AppErrorConstructor = {
  code: string
  message?: string
  error?: unknown
  debug?: DebugObject
  name?: string
}
type LogEntry = {
  code: string
  name: string
  message?: string
  debug?: DebugObject
  stack?: string
}
type GetLogsOptions = {
  level: 'full' | 'short'
}
class AppError extends Error {
  code: string
  debug: DebugObject
  children: AppError[]
  constructor ({ code, message = 'noMessage', debug = {}, name, error }: AppErrorConstructor) {
    super(message)
    this.code = code
    this.debug = debug
    this.name = name || 'AppError'
    this.children = []
    if (error) {
      this.processError(error)
    }
  }

  // added node v10.12.0
  [util.inspect.custom] () {
    return this.getLogs()
  }

  public getLogs (options?: GetLogsOptions) {
    const { level = 'short' } = options || {}
    const processError = (error: AppError, out: LogEntry[] = []): LogEntry[] => {
      const e: LogEntry = { code: error.code, name: error.name }
      if (level === 'full') {
        if (error.message !== 'noMessage') e.message = error.message
        if (Object.keys(error.debug).length > 0) e.debug = error.debug
        if (!error.children.length) e.stack = error.stack
        out.push(e)
        error.children.forEach(error => processError(error, out))
      } else if (level === 'short') {
        const child = error.children[0] || {}
        if (error.name !== 'AppError' || !child || child.name !== 'AppError') {
          if (error.message !== 'noMessage') e.message = error.message
          if (Object.keys(error.debug).length > 0) e.debug = error.debug
          out.push(e)
        }
        error.children.forEach(error => processError(error, out))
      } else {
        throw new Error('unknownAppErrorLogsLevel')
      }
      return out
    }

    return processError(this)
  }

  private processError (error: unknown) {
    if (error instanceof AppError) {
      this.children.push(error)
    } else if (error instanceof Error) {
      const options = {
        code: 'caughtError',
        name: error && error.name,
        message: error && error.message,
        stack: error && error.stack
      }
      this.children.push(new AppError(options))
    } else {
      const options: AppErrorConstructor = {
        code: 'caughtUnknownConstructorError'
      }
      if (error && typeof error === 'object') {
        const { message, name } = error as Error
        options.message = message
        options.name = name
      } else if (typeof error === 'string') {
        options.message = error
      }
      this.children.push(new AppError(options))
    }
  }
}

export default AppError
