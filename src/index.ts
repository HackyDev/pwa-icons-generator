import logger from './modules/Logger'
import AppError from './modules/AppError'
import { processAndCopyMainParams, createTargetConfig, createTargetIcons, processTargetIcons, createOutput } from './helpers'
import { getDefaultConfig, getDefaultIcons } from './defaults'
import type { PrimaryConfig, SecondaryConfig, Output } from './helpers'

if (process.argv[2] === 'start') {
  const foregroundImage = 'https://upload.wikimedia.org/wikipedia/commons/9/94/Cc_large.png'
  main(foregroundImage)
}

/**
 * You only need **5 icons** to meet most needs! Explained [here](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)
  ```typescript
    import pwaIconsGenerator, { Output } from 'pwa-icons-generator'

    const foregroundImage = `https://upload.wikimedia.org/wikipedia/commons/9/94/Cc_large.png`
    const output: Output = await pwaIconsGenerator(foregroundImage)
  ```
*/
async function main (pathOrPrimaryConfig: string | PrimaryConfig, secondaryConfig?: SecondaryConfig): Promise<Output> {
  try {
    const defaultConfig = getDefaultConfig()
    const defaultIcons = getDefaultIcons()
    const { configs, path } = processAndCopyMainParams(pathOrPrimaryConfig, secondaryConfig)
    const targetConfig = createTargetConfig(defaultConfig, configs.primary, configs.secondary, path)
    logger.logOnOff(targetConfig.preventLogs)
    const primaryConfigIcons = configs.primary && configs.primary.icons
    const targetIcons = await createTargetIcons(targetConfig, defaultIcons, primaryConfigIcons)
    await processTargetIcons(targetIcons)
    return createOutput(targetIcons)
  } catch (error) {
    handleError(error)
  }
}

// MISC

function handleError (error: Error | AppError | unknown): never {
  const defaultConfig = getDefaultConfig()
  if (error instanceof AppError) {
    const log = error.getLogs({ level: 'short' as const })
    logger.error(log)
  } else {
    logger.error(error)
  }
  throw new Error(`${defaultConfig.projectNameCamel}Error`)
}

export default main
export { getDefaultIcons }
export type { PrimaryConfig, SecondaryConfig, Output }
