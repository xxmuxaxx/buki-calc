module.exports = {
  '*.js': ['npm run lint:eslint', 'npm run lint:prettier', 'git add'],
  '{!(package)*.json,*.!(browserslist)*rc}': [
    'npm run lint:prettier --parser json',
    'git add',
  ],
  'package.json': ['npm run lint:prettier', 'git add'],
  '*.scss': ['npm run lint:stylelint', 'npm run lint:prettier', 'git add'],
};
