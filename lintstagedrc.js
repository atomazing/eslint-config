export default {
	'**/*.json': 'prettier --write',
	'**/*.{js,ts,tsx}': ['eslint', 'prettier --write'],
}
