// Type definitions for btt-node 
// Definitions by: wojciech.polowniak@gmail.com https://mozillians.org/pl/u/wopolow/

import * as Types from '../src/types';

/*~ Write your module's methods and properties in this class */
declare class BTT {
    constructor(config: Types.IBTTConfig);

    public Trigger: Types.ITrigger;
    public Widget: Types.IWidget;
    
    do(action: string, data: Record<string, any>): Promise<void>
}

/*~ If you want to expose types from your module as well, you can
 *~ place them in this block.
 */
declare namespace BTT {
    
}

export default BTT;