import minimatch from 'minimatch';
import * as path from 'path';
import {Plugin} from 'rollup';

const emptyModule = 'export default {}';
const emptyModuleName = '\0empty_module';

function getMatchableImportee(importee: string): string {
  return importee.startsWith('.') ? path.resolve(importee) : importee;
}

export function matches(importee: string, patterns: string[]): boolean {
  return patterns.some(pattern =>
    minimatch(getMatchableImportee(importee), pattern, {dot: true})
  );
}

export function replaceWithEmptyModule(patterns: string[] = []): Plugin {
  return {
    name: 'replace-with-empty-module',
    async resolveId(importee: string): Promise<string | undefined> {
      return matches(importee, patterns) ? emptyModuleName : undefined;
    },
    async load(id: string): Promise<string | undefined> {
      return id === emptyModuleName ? emptyModule : undefined;
    },
  };
}
