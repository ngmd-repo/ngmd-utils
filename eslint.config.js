const { useAggregatorConfigs } = require('@ngmd/linter/eslint');

module.exports = useAggregatorConfigs({
  tsConfig: 'tsconfig.json',
});
