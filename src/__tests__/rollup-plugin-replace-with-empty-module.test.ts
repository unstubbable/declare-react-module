import {matches} from '../rollup-plugin-replace-with-empty-module';

describe('rollup-plugin-replace-with-empty-module', () => {
  describe('matches()', () => {
    describe('with patterns "[\'**/*.css\']"', () => {
      it('matches "./styles.css"', () => {
        expect(matches('./styles.css', ['**/*.css'])).toBe(true);
      });

      it('matches "../styles.css"', () => {
        expect(matches('../styles.css', ['**/*.css'])).toBe(true);
      });

      it('does not match "./component"', () => {
        expect(matches('./component', ['**/*.css'])).toBe(false);
      });

      it('does not match "./componentcss"', () => {
        expect(matches('./componentcss', ['**/*.css'])).toBe(false);
      });
    });
  });
});
