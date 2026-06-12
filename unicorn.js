// @ts-check
import unicornPlugin from 'eslint-plugin-unicorn'

/** @type {import('eslint').Linter.Config[]} */
const config = [
	unicornPlugin.configs.recommended,
	{
		name: 'unicorn-atomazing',
		rules: {
			// Enforce specific import styles per module (we already have enough import rules, and this one has a small performance cost)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/import-style.md
			'unicorn/import-style': 'off',

			// Enforce a camelCase and PascalCase styles for filenames
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md
			'unicorn/filename-case': [
				'warn',
				{ cases: { camelCase: true, pascalCase: true }, ignore: ['vite-env.d.ts'] },
			],

			// Prefer better DOM traversal APIs (some suggested fixes are not mechanical migrations: for example, replacing element.children[2] with element.querySelector('selector') requires DOM structure knowledge and a correct selector)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/better-dom-traversing.md
			'unicorn/better-dom-traversing': 'off',

			// Enforce consistent spelling of compound words in identifiers (default dictionaries for naming/spelling rules work poorly with project-specific domain terms and can require incorrect renames; rule timing measured 67.607ms)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-compound-words.md
			'unicorn/consistent-compound-words': 'off',

			// Enforce consistent JSON file reads before JSON.parse() (for TS code, parsing a Buffer instead of a string should already be reported by the typechecker, and the educational value is not enough for a global rule; TODO: consider enabling in 4.0.0)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-json-file-read.md
			'unicorn/consistent-json-file-read': 'off',

			// Disallow new Array() with one argument (for fixed-length arrays, it suggests visually heavy syntax, so we disable it)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-new-array.md
			'unicorn/no-new-array': 'off',

			// Disallow the use of the null literal (this is a subjective preset choice, so we disable it)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-null.md
			'unicorn/no-null': 'off',

			// Prefer JavaScript modules (ESM) over CommonJS (our dev environment uses CommonJS, so we disable it)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-module.md
			'unicorn/prefer-module': 'off',

			// Prefer the spread operator over Array.from(...), Array#concat(...), Array#{slice,toSpliced}() and String#split('') (this rule can be wrong for some cases, such as array-like values without an iterator, so we keep it disabled)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-spread.md
			'unicorn/prefer-spread': 'off',

			// Prevent abbreviations (creates too much noise, and unclear variables are still possible with this rule; we catch these in PR review instead)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md
			'unicorn/prevent-abbreviations': 'off',

			// Disallow Array#reduce() and Array#reduceRight() (this bans reduce usage)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-reduce.md
			'unicorn/no-array-reduce': 'off',

			// Disallow unnecessary Blob to File conversion (can affect complex file-handling flows where File may be intentional, while the rule scenario is narrow and optional for the shared config)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-blob-to-file.md
			'unicorn/no-blob-to-file': 'off',

			// Prefer drawing canvases directly instead of converting them to images (can affect complex image-processing flows where an intermediate image/data URL may be part of an intentional pipeline)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-canvas-to-image.md
			'unicorn/no-canvas-to-image': 'off',

			// Disallow confusing uses of Array#{splice,toSpliced}() (some suggested fixes make code more complex and require manual review of index behavior, mutation, and return values)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-confusing-array-splice.md
			'unicorn/no-confusing-array-splice': 'off',

			// Enforce the use of built-in methods instead of unnecessary polyfills (we do not use polyfills in the project, so this is an unnecessary check)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-polyfills.md
			'unicorn/no-unnecessary-polyfills': 'off',

			// Makes possible to pass arguments to TODO, FIXME and XXX comments to trigger ESLint to report (we do not use this workflow, and the rule has a performance cost)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/expiring-todo-comments.md
			'unicorn/expiring-todo-comments': 'off',

			// Prevent usage of variables from outside the scope of isolated functions e.g. functions passed to makeSynchronous() run in worker/subprocess and cannot access outer scope. (we do not use this because it is very specific and should be enabled per project only when needed)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/isolated-functions.md
			'unicorn/isolated-functions': 'off',

			// Prefer the simpler condition first in logical expressions (condition order is often intentional: guard first, main check after; autofix can change behavior because of short-circuit evaluation, so we disable it)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-simple-condition-first.md
			'unicorn/prefer-simple-condition-first': 'off',

			// Disallow unused return values from array methods (can make upgrades much harder on some projects, and part of the behavior is already covered by other rules; TODO: consider enabling in 4.0.0)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unused-array-method-return.md
			'unicorn/no-unused-array-method-return': 'off',

			// Prefer HTTPS over HTTP (too rare a case for a separate global rule; URLs with protocols are better checked in context when they are added or changed)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-https.md
			'unicorn/prefer-https': 'off',

			// Prefer String#split() with a limit (this is a micro-optimization that often hurts readability: split('/')[1] is easier to scan than split('/', 2)[1], and the practical gain is usually too small)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-split-limit.md
			'unicorn/prefer-split-limit': 'off',

			// Prefer String#matchAll() over RegExp#exec() loops (RegExp#exec() loops are sometimes intentional when regexp state control, early exit, or step-by-step processing matters)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-match-all.md
			'unicorn/prefer-string-match-all': 'off',

			// Prefer switch over multiple else-if (for really large cases, use switch or a mapping object)
			// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-switch.md
			'unicorn/prefer-switch': ['error', { minimumCases: 5 }],
		},
	},
]

export default config
