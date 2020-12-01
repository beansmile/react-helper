import * as React from 'react';
declare function paramParser(Page: React.ComponentType): React.ComponentType;
declare function paramParser(pageKey?: string): ((Page: React.ComponentType) => React.ComponentType);
export default paramParser;
