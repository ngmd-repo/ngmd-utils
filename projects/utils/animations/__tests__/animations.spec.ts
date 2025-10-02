import {
  ANRepeatState,
  ANShowFade,
  ANShowQuery,
  ANShowTriggerQuery,
  ANStyles,
  ANStylesHide,
  ANStylesQueryState,
  ANStylesState,
} from '../src/animations';

describe('Animations', () => {
  describe('aNShowFade', () => {
    it('should return the correct animation trigger metadata', () => {
      const params = {
        timingFrom: '300ms ease-out',
        timingTo: '500ms ease-in',
        animationName: 'CustomAnimation',
      };

      const result = ANShowFade(params);
      expect(result).toStrictEqual({
        type: 7,
        name: 'CustomAnimation',
        definitions: [
          {
            type: 1,
            expr: ':enter',
            animation: [
              { type: 6, styles: { opacity: 0 }, offset: null },
              {
                type: 4,
                styles: { type: 6, styles: { opacity: 1 }, offset: null },
                timings: '300ms ease-out',
              },
            ],
            options: null,
          },
          {
            type: 1,
            expr: ':leave',
            animation: [
              { type: 6, styles: { opacity: 1 }, offset: null },
              {
                type: 4,
                styles: { type: 6, styles: { opacity: 0 }, offset: null },
                timings: '500ms ease-in',
              },
            ],
            options: null,
          },
        ],
        options: {},
      });
    });

    it('should use default values if no params are provided', () => {
      const result = ANShowFade({});

      expect(result).toStrictEqual({
        type: 7,
        name: 'ANShowFade',
        definitions: [
          {
            type: 1,
            expr: ':enter',
            animation: [
              { type: 6, styles: { opacity: 0 }, offset: null },
              {
                type: 4,
                styles: { type: 6, styles: { opacity: 1 }, offset: null },
                timings: '200ms ease-in',
              },
            ],
            options: null,
          },
          {
            type: 1,
            expr: ':leave',
            animation: [
              { type: 6, styles: { opacity: 1 }, offset: null },
              {
                type: 4,
                styles: { type: 6, styles: { opacity: 0 }, offset: null },
                timings: '200ms ease-in',
              },
            ],
            options: null,
          },
        ],
        options: {},
      });
    });

    it('should use timingFrom as timingTo if timingTo is not provided', () => {
      const params = {
        timingFrom: '300ms ease-out',
      };

      const result = ANShowFade(params);

      expect(result).toStrictEqual({
        type: 7,
        name: 'ANShowFade',
        definitions: [
          {
            type: 1,
            expr: ':enter',
            animation: [
              { type: 6, styles: { opacity: 0 }, offset: null },
              {
                type: 4,
                styles: { type: 6, styles: { opacity: 1 }, offset: null },
                timings: '300ms ease-out',
              },
            ],
            options: null,
          },
          {
            type: 1,
            expr: ':leave',
            animation: [
              { type: 6, styles: { opacity: 1 }, offset: null },
              {
                type: 4,
                styles: { type: 6, styles: { opacity: 0 }, offset: null },
                timings: '300ms ease-out',
              },
            ],
            options: null,
          },
        ],
        options: {},
      });
    });
  });
  describe('aNStyles', () => {
    it('should return the correct animation trigger metadata', () => {
      const params = {
        fromStyle: { opacity: '0' },
        toStyle: { opacity: '1' },
        timingFrom: '300ms ease-out',
        timingTo: '500ms ease-in',
        animationName: 'CustomAnimation',
        enableLeave: true,
      };

      const result = ANStyles(params);

      expect(result).toStrictEqual({
        type: 7,
        name: 'CustomAnimation',
        definitions: [
          {
            type: 1,
            expr: ':enter',
            animation: [
              { type: 6, styles: { opacity: '0' }, offset: null },
              {
                type: 4,
                styles: { type: 6, styles: { opacity: '1' }, offset: null },
                timings: '300ms ease-out',
              },
            ],
            options: null,
          },
          {
            type: 1,
            expr: ':leave',
            animation: {
              type: 4,
              styles: { type: 6, styles: { opacity: '0' }, offset: null },
              timings: '500ms ease-in',
            },
            options: null,
          },
        ],
        options: {},
      });
    });

    it('should use default values if no params are provided', () => {
      const result = ANStyles({});

      expect(result).toStrictEqual({
        type: 7,
        name: 'ANStyles',
        definitions: [
          {
            type: 1,
            expr: ':enter',
            animation: [
              { type: 6, styles: {}, offset: null },
              {
                type: 4,
                styles: { type: 6, styles: {}, offset: null },
                timings: '300ms ease-in',
              },
            ],
            options: null,
          },
          {
            type: 1,
            expr: ':leave',
            animation: {
              type: 4,
              styles: { type: 6, styles: {}, offset: null },
              timings: '300ms ease-in',
            },
            options: null,
          },
        ],
        options: {},
      });
    });

    it('should not include ":leave" transition if enableLeave is false', () => {
      const params = {
        enableLeave: false,
      };

      const result = ANStyles(params);

      expect(result).toStrictEqual({
        type: 7,
        name: 'ANStyles',
        definitions: [
          {
            type: 1,
            expr: ':enter',
            animation: [
              { type: 6, styles: {}, offset: null },
              {
                type: 4,
                styles: { type: 6, styles: {}, offset: null },
                timings: '300ms ease-in',
              },
            ],
            options: null,
          },
        ],
        options: {},
      });
    });
  });
  describe('aNStylesHide', () => {
    it('should return the correct animation trigger metadata', () => {
      const params = {
        fromStyle: { opacity: '1' },
        toStyle: { opacity: '0' },
        timing: '300ms ease-out',
        animationName: 'CustomAnimation',
      };

      const result = ANStylesHide(params);
      expect(result).toStrictEqual({
        type: 7,
        name: 'CustomAnimation',
        definitions: [
          {
            type: 1,
            expr: ':leave',
            animation: [
              { type: 6, styles: { opacity: '1' }, offset: null },
              {
                type: 4,
                styles: { type: 6, styles: { opacity: '0' }, offset: null },
                timings: '300ms ease-out',
              },
            ],
            options: null,
          },
        ],
        options: {},
      });
    });

    it('should use default values if no params are provided', () => {
      const result = ANStylesHide({});

      expect(result).toStrictEqual({
        type: 7,
        name: 'ANStylesHide',
        definitions: [
          {
            type: 1,
            expr: ':leave',
            animation: [
              { type: 6, styles: {}, offset: null },
              {
                type: 4,
                styles: { type: 6, styles: {}, offset: null },
                timings: '300ms ease-in',
              },
            ],
            options: null,
          },
        ],
        options: {},
      });
    });
  });
  describe('aNStylesState', () => {
    it('should return the correct animation trigger metadata', () => {
      const params = {
        fromStyle: { opacity: '0' },
        fromState: 'stateA',
        toStyle: { opacity: '1' },
        toState: 'stateB',
        timing: '500ms ease-in',
        animationName: 'CustomAnimation',
      };

      const result = ANStylesState(params);

      expect(result).toStrictEqual({
        type: 7,
        name: 'CustomAnimation',
        definitions: [
          {
            type: 0,
            name: 'stateA',
            options: undefined,
            styles: { type: 6, styles: { opacity: '0' }, offset: null },
          },
          {
            type: 0,
            name: 'stateB',
            options: undefined,
            styles: { type: 6, styles: { opacity: '1' }, offset: null },
          },
          {
            type: 1,
            expr: 'stateA<=>stateB',
            animation: { type: 4, styles: null, timings: '500ms ease-in' },
            options: null,
          },
        ],
        options: {},
      });
    });

    it('should use default values if no params are provided', () => {
      const result = ANStylesState({});

      expect(result).toEqual({
        type: 7,
        name: 'ANStylesState',
        definitions: [
          {
            type: 0,
            name: '*',
            styles: { type: 6, styles: {}, offset: null },
          },
          { type: 0, name: '*', styles: { type: 6, styles: {}, offset: null } },
          {
            type: 1,
            expr: '*<=>*',
            animation: { type: 4, styles: null, timings: '300ms ease-in' },
            options: null,
          },
        ],
        options: {},
      });
    });
  });
  describe('aNStylesQueryState', () => {
    it('should return the correct animation trigger metadata', () => {
      const params = {
        fromStyle: { opacity: '0' },
        fromState: 'stateA',
        toStyle: { opacity: '1' },
        toState: 'stateB',
        timing: '500ms ease-in',
        selectors: '.element',
        animationName: 'CustomAnimation',
      };

      const result = ANStylesQueryState(params);

      expect(result).toStrictEqual({
        type: 7,
        name: 'CustomAnimation',
        definitions: [
          {
            type: 1,
            expr: 'stateA=>stateB',
            animation: [
              {
                type: 11,
                selector: '.element',
                animation: [
                  { type: 6, styles: { opacity: '0' }, offset: null },
                  {
                    type: 4,
                    styles: { type: 6, styles: { opacity: '1' }, offset: null },
                    timings: '500ms ease-in',
                  },
                ],
                options: { optional: true },
              },
            ],
            options: null,
          },
          {
            type: 1,
            expr: 'stateB=>stateA',
            animation: [
              {
                type: 11,
                selector: '.element',
                animation: [
                  { type: 6, styles: { opacity: '1' }, offset: null },
                  {
                    type: 4,
                    styles: { type: 6, styles: { opacity: '0' }, offset: null },
                    timings: '500ms ease-in',
                  },
                ],
                options: { optional: true },
              },
            ],
            options: null,
          },
        ],
        options: {},
      });
    });

    it('should use default values if no params are provided', () => {
      const result = ANStylesQueryState({});

      expect(result).toStrictEqual({
        type: 7,
        name: 'ANStylesState',
        definitions: [
          {
            type: 1,
            expr: '*=>*',
            animation: [
              {
                type: 11,
                selector: '@*',
                animation: [
                  { type: 6, styles: {}, offset: null },
                  {
                    type: 4,
                    styles: { type: 6, styles: {}, offset: null },
                    timings: '300ms ease-in',
                  },
                ],
                options: { optional: true },
              },
            ],
            options: null,
          },
          {
            type: 1,
            expr: '*=>*',
            animation: [
              {
                type: 11,
                selector: '@*',
                animation: [
                  { type: 6, styles: {}, offset: null },
                  {
                    type: 4,
                    styles: { type: 6, styles: {}, offset: null },
                    timings: '300ms ease-in',
                  },
                ],
                options: { optional: true },
              },
            ],
            options: null,
          },
        ],
        options: {},
      });
    });
  });
  describe('aNShowQuery', () => {
    it('should return the correct animation trigger metadata', () => {
      const params = {
        selectors: '.element',
        fromStyle: { opacity: '0' },
        toStyle: { opacity: '1' },
        timing: '500ms ease-in',
        animationName: 'CustomAnimation',
      };

      const result = ANShowQuery(params);

      expect(result).toStrictEqual({
        type: 7,
        name: 'CustomAnimation',
        definitions: [
          {
            type: 1,
            expr: ':enter',
            animation: [
              {
                type: 11,
                selector: '.element',
                animation: [
                  { type: 6, styles: { opacity: '0' }, offset: null },
                  {
                    type: 4,
                    styles: { type: 6, styles: { opacity: '1' }, offset: null },
                    timings: '500ms ease-in',
                  },
                ],
                options: { optional: true },
              },
            ],
            options: null,
          },
          {
            type: 1,
            expr: ':leave',
            animation: [
              {
                type: 11,
                selector: '.element',
                animation: [
                  { type: 6, styles: { opacity: '1' }, offset: null },
                  {
                    type: 4,
                    styles: { type: 6, styles: { opacity: '0' }, offset: null },
                    timings: '500ms ease-in',
                  },
                ],
                options: { optional: true },
              },
            ],
            options: null,
          },
        ],
        options: {},
      });
    });

    it('should use default values if no params are provided', () => {
      const result = ANShowQuery({});

      expect(result).toStrictEqual({
        type: 7,
        name: 'ANShowQuery',
        definitions: [
          {
            type: 1,
            expr: ':enter',
            animation: [
              {
                type: 11,
                selector: '@*',
                animation: [
                  { type: 6, styles: {}, offset: null },
                  {
                    type: 4,
                    styles: { type: 6, styles: {}, offset: null },
                    timings: '300ms ease-in',
                  },
                ],
                options: { optional: true },
              },
            ],
            options: null,
          },
          {
            type: 1,
            expr: ':leave',
            animation: [
              {
                type: 11,
                selector: '@*',
                animation: [
                  { type: 6, styles: {}, offset: null },
                  {
                    type: 4,
                    styles: { type: 6, styles: {}, offset: null },
                    timings: '300ms ease-in',
                  },
                ],
                options: { optional: true },
              },
            ],
            options: null,
          },
        ],
        options: {},
      });
    });

    describe('aNShowTriggerQuery', () => {
      it('should return the correct animation trigger metadata', () => {
        const params = {
          selectors: '.element',
          animationName: 'CustomAnimation',
        };

        const result = ANShowTriggerQuery(params);

        expect(result).toStrictEqual({
          type: 7,
          name: 'CustomAnimation',
          definitions: [
            {
              type: 1,
              expr: ':enter, :leave',
              animation: [
                {
                  type: 11,
                  selector: '.element',
                  animation: [{ type: 9, options: null }],
                  options: { optional: true },
                },
              ],
              options: null,
            },
          ],
          options: {},
        });
      });

      it('should use default values if no params are provided', () => {
        const result = ANShowTriggerQuery({});

        expect(result).toStrictEqual({
          type: 7,
          name: 'ANShowTriggerQuery',
          definitions: [
            {
              type: 1,
              expr: ':enter, :leave',
              animation: [
                {
                  type: 11,
                  selector: '@*',
                  animation: [{ type: 9, options: null }],
                  options: { optional: true },
                },
              ],
              options: null,
            },
          ],
          options: {},
        });
      });
    });

    describe('aNRepeatState', () => {
      it('should return the correct animation trigger metadata', () => {
        const params = {
          fromState: 'stateA',
          toState: 'stateB',
          fromStyle: { opacity: '0' },
          toStyle: { opacity: '1' },
          timing: '500ms ease-in',
          animationName: 'CustomAnimation',
        };

        const result = ANRepeatState(params);

        expect(result).toStrictEqual({
          type: 7,
          name: 'CustomAnimation',
          definitions: [
            {
              type: 1,
              expr: 'stateA <=> stateB',
              animation: [
                { type: 6, styles: { opacity: '0' }, offset: null },
                {
                  type: 4,
                  styles: { type: 6, styles: { opacity: '1' }, offset: null },
                  timings: '500ms ease-in',
                },
              ],
              options: null,
            },
          ],
          options: {},
        });
      });

      it('should use default values if no params are provided', () => {
        const result = ANRepeatState({});

        expect(result).toStrictEqual({
          type: 7,
          name: 'ANRepeatState',
          definitions: [
            {
              type: 1,
              expr: '* <=> *',
              animation: [
                { type: 6, styles: {}, offset: null },
                {
                  type: 4,
                  styles: { type: 6, styles: {}, offset: null },
                  timings: '300ms ease-in',
                },
              ],
              options: null,
            },
          ],
          options: {},
        });
      });
    });
  });
});
