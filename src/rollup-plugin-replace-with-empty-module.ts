import minimatch = require('minimatch');
import * as path from 'path';
import {Plugin} from 'rollup';

const emptyModule = 'export default {}';
const emptyModuleName = '\0empty_module';

function getMatchableImportee(importee: string): string {
  return importee.startsWith('.') ? path.resolve(importee) : importee;
}

function matches(importee: string, patterns: string[]): boolean {
  return patterns.some(pattern => (
    minimatch(getMatchableImportee(importee), pattern)
  ));
}

export function replaceWithEmptyModule(patterns: string[]): Plugin {
  return {
    resolveId(importee: string): string | null {
      return matches(importee, patterns) ? emptyModuleName : null;
    },
    load(id: string): string | null {
      return id === emptyModuleName ? emptyModule : null;
    }
  };
}
