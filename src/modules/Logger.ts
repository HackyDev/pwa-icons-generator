type LogColor = 'cyan' | 'red'

let logOff = true

function log (...args: unknown[]) {
  if (logOff) return
  console.log(...args)
}

function error (...args: unknown[]) {
  console.dir(...args, { depth: null })
}

// function colorLog (color: LogColor, ...args: any[]) {
//   const color_ = getLogColor(color)
//   console.log(color_, ...args)
// }

function logOnOff (state: boolean) {
  logOff = state
}

function getLogColor (color: LogColor): string {
  // Reset = "\x1b[0m"
  // Bright = "\x1b[1m"
  // Dim = "\x1b[2m"
  // Underscore = "\x1b[4m"
  // Blink = "\x1b[5m"
  // Reverse = "\x1b[7m"
  // Hidden = "\x1b[8m"
  // FgBlack = "\x1b[30m"
  // FgRed = "\x1b[31m"
  // FgGreen = "\x1b[32m"
  // FgYellow = "\x1b[33m"
  // FgBlue = "\x1b[34m"
  // FgMagenta = "\x1b[35m"
  // FgCyan = "\x1b[36m"
  // FgWhite = "\x1b[37m"
  // BgBlack = "\x1b[40m"
  // BgRed = "\x1b[41m"
  // BgGreen = "\x1b[42m"
  // BgYellow = "\x1b[43m"
  // BgBlue = "\x1b[44m"
  // BgMagenta = "\x1b[45m"
  // BgCyan = "\x1b[46m"
  // BgWhite = "\x1b[47m"
  const base = '\x1b[36m%s'
  return base + {
    cyan: '\x1b[0m',
    red: '\x1b[31m'
  }[color]
}

export default { log, error, logOnOff, getLogColor }
