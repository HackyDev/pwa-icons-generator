import { getDefaultIcons } from './defaults';
import type { PrimaryConfig, SecondaryConfig, Output } from './helpers';
/**
 * You only need **5 icons** to meet most needs! Explained [here](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)
  ```typescript
    import pwaIconsGenerator, { Output } from 'pwa-icons-generator'

    const foregroundImage = `https://upload.wikimedia.org/wikipedia/commons/9/94/Cc_large.png`
    const output: Output = await pwaIconsGenerator(foregroundImage)
  ```
*/
declare function main(pathOrPrimaryConfig: string | PrimaryConfig, secondaryConfig?: SecondaryConfig): Promise<Output>;
export default main;
export { getDefaultIcons };
export type { PrimaryConfig, SecondaryConfig, Output };
