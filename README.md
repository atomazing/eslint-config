<p align="center">
  <img src="https://github.com/user-attachments/assets/eaf0d86c-feeb-4420-b870-1857b92ca7f5" />
</p>

# What is @atomazing-org/eslint-config?

`@atomazing-org/eslint-config` is a carefully curated set of ESLint rules aimed at optimizing the development process, based on [`eslint-config-airbnb-base` config](https://www.npmjs.com/package/eslint-config-airbnb-base). Some rules have been excluded or modified in this set that could negatively affect developer convenience. For example, using export default has been prohibited to maintain a uniform style across the project, reducing the load on the developer. Additionally, some rules were moved from errors to warnings, allowing for more flexible management of the coding process without the strict need to fix every minor detail.

## Connecting the dependency @atomazing-org/eslint-config

To connect, you need to install `@atomazing-org/eslint-config` in the project.

```bash
npm i -D @atomazing-org/eslint-config
```

Then create `eslint.config.js` _(or `eslint.config.mjs` if your project is CommonJS and doesn't have `"type": "module"` in `package.json`)_ in the root of the project.

for modern node versions >= 20.11.0 `eslint.config.*` example:

```js
import { defineAtomazingConfig } from '@atomazing-org/eslint-config'

export default defineAtomazingConfig({
	dirname: import.meta.dirname,
})
```

_for node versions < 20.11.0 `eslint.config.*` example:_

```js
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineAtomazingConfig } from '@atomazing-org/eslint-config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineAtomazingConfig({
	dirname: __dirname,
})
```

## Files ignoring

The configuration uses ESLint v9's `globalIgnores` function to specify files that should not be validated. By default, the following patterns are ignored:

```js
globalIgnores(['node_modules', 'dist', 'public', 'coverage', 'eslint.config.{js,mjs,ts}'])
```

If you need to add additional ignore patterns, you can extend the configuration:

`eslint.config.*` example:

```js
import { globalIgnores } from 'eslint/config'
import { defineAtomazingConfig } from '@atomazing-org/eslint-config'

export default [
	globalIgnores(['someRootFolder/', '**/someFileType.ts']),
	...defineAtomazingConfig({ dirname: import.meta.dirname }), // or dirname: path.dirname(fileURLToPath(import.meta.url)) for node versions < 20.11.0
]
```

<br>

_[`.eslintignore` is not supported by ESLint anymore](https://eslint.org/docs/latest/use/configure/migration-guide#ignoring-files)_

## Run linter

You can run eslint on a project using the command:

```bash
npx eslint "**/*.{js,ts,tsx}"
```

However, it's more convenient to move this command into the scripts section of `package.json`, for example, through the format command and call it via npm run format.

`package.json` example:

```json
{
    "name": "my-app",
    "version": "1.0.0",
    "description": "",
    "scripts": {
        "format:eslint": "npm run lint:eslint -- --fix",
        "lint:eslint": "eslint \"**/*.{js,ts,tsx}\"",
    },
    "dependencies": {
        ..
    },
    "devDependencies": {
        "@atomazing-org/eslint-config": "^2.0.0"
        ...
    },
}
```

_Optional_. Run the [visual tool](https://eslint.org/blog/2024/04/eslint-config-inspector/) to help you understand and inspect the resulting ESLint rules:

```bash
npx eslint --inspect-config
```

---

## ⚠️ Migration to v2

1. Update dependencies:

   ```bash
   # Update @atomazing-org/eslint-config to v2
   npm i -D @atomazing-org/eslint-config@latest

   # If you have a dedicated eslint dependency, update it to v9
   npm i -D eslint@9
   ```

2. Replace `.eslintrc.json` (or `.eslintrc.js`) with `eslint.config.*`:

   - Use **`eslint.config.js`** for ESM projects (with `"type": "module"` in `package.json`)
   - Use **`eslint.config.mjs`** for CommonJS projects (without `"type": "module"` in `package.json`)

3. Setup configuration file [according our docs](#connecting-the-dependency-atomazing-orgeslint-config)

4. If you have custom ignore patterns in `.eslintignore`, [migrate them to use `globalIgnores` in your config](#files-ignoring) and then **delete** `.eslintignore` file, since it's not supported anymore by ESLint v9

5. Review breaking changes in transitive dependencies:

   - [typescript-eslint v8 breaking changes](https://typescript-eslint.io/blog/announcing-typescript-eslint-v8/)
   - [ESLint v9 breaking changes](https://eslint.org/docs/latest/use/migrate-to-9.0.0)

6. Update ESLint disable comments, _if you have them_:

   Replace `eslint-plugin-eslint-comments/require-description` with `@eslint-community/eslint-comments/require-description`

   Before:

   ```js
   // eslint-disable-next-line eslint-plugin-eslint-comments/require-description -- not acceptable
   ```

   After:

   ```js
   // eslint-disable-next-line @eslint-community/eslint-comments/require-description -- not acceptable
   ```

7. Additional considerations:

   - Review your custom ESLint rules and ensure they're compatible with the flat config system
   - If you're using custom plugins, make sure they support ESLint v9's flat config
   - Check that your CI/CD pipelines are updated to use the new configuration format
   - check [FAQ](#faq)

8. Troubleshooting:
   - If you encounter TypeScript-related errors, ensure your `tsconfig.json` is properly configured
   - If you see unexpected rule behavior in default eslint rules, check the [ESLint v9 migration guide](https://eslint.org/docs/latest/use/migrate-to-9.0.0) for rule changes

---

## FAQ

1. _How to add custom rules?_

   Extend base config and then apply your rules:

   `eslint.config.*` example:

   ```js
   import { defineAtomazingConfig } from '@atomazing-org/eslint-config'

   export default [
   	...defineAtomazingConfig({ dirname: import.meta.dirname }), // or dirname: path.dirname(fileURLToPath(import.meta.url)) for node versions < 20.11.0
   	{
   		name: 'your-config-name',
   		rules: {
   			'@typescript-eslint/no-explicit-any': 'warn',
   			'react/jsx-handler-names': 'off',
   		},
   	},
   ]
   ```

2. _How can I get more control over applied rules and settings?_

   `eslint.config.*` example:

   ```js
   import { defineConfig } from 'eslint/config' // this dependency should transitively come from '@atomazing-org/eslint-config'
   import atomazingConfig from '@atomazing-org/eslint-config'

   export default defineConfig({
   	languageOptions: {
   		parserOptions: {
   			tsconfigRootDir: import.meta.dirname, // or tsconfigRootDir: path.dirname(fileURLToPath(import.meta.url)) for node versions < 20.11.0
   		},
   	},
   	extends: [atomazingConfig],
   	settings: {
   		'import/resolver': {
   			typescript: { project: `${import.meta.dirname}/tsconfig.json` }, // or project: path.dirname(fileURLToPath(import.meta.url)) for node versions < 20.11.0
   		},
   	},
   	rules: {
   		'@typescript-eslint/no-explicit-any': 'warn',
   		'react/jsx-handler-names': 'off',
   	},
   })
   ```

   Check the [ESLint Configuration Files documentation](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file) to understand configuration files.

   ⚠️ Ensure you set `languageOptions.parserOptions.tsconfigRootDir` and `settings.['import/resolver'].typescript` for TS support in type rules.

## Base @atomazing-org/eslint-config

The configuration is built using ESLint's new flat config system and includes several key components:

1. [**Base Configuration**](./base): Includes essential ESLint rules and TypeScript support

   - JavaScript ESLint recommended rules
   - TypeScript ESLint stylistic and recommended rules
   - Import plugin configuration for both JavaScript and TypeScript

2. [**React Configuration**](./react.js): Provides React-specific rules and best practices

   - React recommended rules
   - React Hooks rules
   - JSX runtime configuration

3. [**Unicorn Configuration**](./unicorn.js): Includes the Unicorn plugin's recommended rules for modern JavaScript/TypeScript development

4. [**Global Settings**](./index.js):
   - Latest ECMAScript version support
   - Browser, ES2025, and Node.js globals
   - TypeScript and Node.js import resolution
   - Prettier integration for code formatting

## Benefits of using @atomazing-org/eslint-config:

The ESLint configuration is stored in an npm repository, making it accessible to all team members. This ensures that all project participants adhere to the same coding standards, promoting the unification of the development process and improving code quality. Moreover, with the extracted ESLint configuration, integrating linting into continuous integration (CI) and delivery (CD) processes becomes easy. This automates the code check against standards before deployment, reducing the risk of introducing errors into production. Storing the ESLint configuration in an npm repository simplifies collaborative work on the project. If there is no eslint on the project, it can be easily installed, and there is no need to create a new configuration from scratch for a new project.

The configuration is built using ESLint's new flat config system, which provides several advantages:

- Better performance through optimized rule evaluation
- Simpler configuration structure
- Native TypeScript support
- Improved extensibility
- Better integration with modern tooling
