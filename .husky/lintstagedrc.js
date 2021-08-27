module.exports = {
  '*.{js,ts}': ['prettier --write', 'eslint --fix'],
  '*.vue': ['stylelint --fix', 'prettier --write', 'eslint --fix'],
  '*.{scss,html}': ['stylelint --fix', 'prettier --write']
}
