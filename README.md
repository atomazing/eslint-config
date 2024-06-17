# What is @atomazing-org/eslint-config?
@atomazing-org/eslint-config is a carefully curated set of ESLint rules aimed at optimizing the development process. Some rules have been excluded or modified in this set that could negatively affect developer convenience. For example, using export default has been prohibited to maintain a uniform style across the project, reducing the load on the developer. Additionally, some rules were moved from errors (error) to warnings (warn), allowing for more flexible management of the coding process without the strict need to fix every minor detail.

# Connecting the dependency @atomazing-org/eslint-config
To connect, you need to install eslint in the project, then create **.eslintrc.js** and **.eslintignore.js** files in the root of the project. Let's consider creating the files. **.eslintrc.js**:

    module.exports = {  
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
    },  
    extends: ['@atomazing-org/eslint-config'],
    settings: {
        'правило-eslint': 'off'
    },
    ...
}

In **.eslintignore.js**, place all files that should not be validated by eslint rules."

    node_modules
	tsconfig.json


You can run eslint on a project using the command:

**npm run lint:eslint && npm run lint:prettier && npm run lint:ts**

However, it's more convenient to move this command into the scripts section of package.json, for example, through the format command and call it via npm run format.

       {
    	    "name": "my-app",
    	    "version": "1.0.0",
    	    "description": "",
    	    "scripts": {
    	        "format": "npm run lint:eslint -- --fix",
    	    },
    	    "dependencies": {
    	        ...
    	    },
    	    "devDependencies": {
    	        ...
    	    },
    }


# Base @atomazing-org/eslint-config
Libraries and plugins for ESLint are designed to enhance code quality during React development and ensure compliance with accessibility standards. Here are the main plugins that are used:
1. **plugin:react/recommended**: This plugin provides a set of recommended rules for React projects, including checking prop usage, component types, array keys, and other aspects related to React. It helps detect potential issues in the code, such as missing required props or incorrect hook usage.
2. **plugin:react/jsx-runtime**: With React 17 and above, a new JSX transformation was introduced that does not require explicit import of React in components. However, this may cause ESLint errors indicating that React is out of scope. The plugin:react/jsx-runtime is added to the ESLint configuration to disable relevant rules and prevent these errors.
3. **plugin:react-hooks/recommended**: This plugin is intended for working with React hooks. It includes rules that help avoid common mistakes when using hooks, such as incorrect dependencies or violation of hook call order. This is especially important for maintaining the purity and predictability of component state.
4. **plugin:jsx-a11y/recommended**: A plugin for checking the accessibility of JSX elements. It helps detect potential interface user accessibility issues, such as incorrectly used button roles, missing ARIA attributes, or navigation problems. Using this plugin contributes to creating more accessible web applications.
5. **airbnb-base**: Formatting rules: Defines coding formatting standards, including space usage, tabulation, quotes, etc., to make the code more readable. Regular expressions: Uses regular expressions for automatic fixing of code formatting issues. Error checks: Checks the code for common errors, such as unused variables, incorrect operator usage, etc.
6. **airbnb-typescript/base**: Adds typing Extends TypeScript capabilities by adding strict typing to improve code safety and reliability. Interfaces and types: Provides common interfaces and types that can be useful in many TypeScript projects. Rules and recommendations: Contains TypeScript-specific recommendations on writing code, such as using decorators, modules, and other modern language features. eslint:recommended: This is a set of ESLint rules considered most important for most projects. They help detect common errors and code issues, such as undefined variable usage, incorrect operator usage, etc.
7. **plugin:@typescript-eslint/recommended**: This plugin extends ESLint to support TypeScript. It includes a set of recommended rules specially adapted for TypeScript to help developers avoid type errors and improve code structure.
8. **plugin:import/recommended** and **plugin:import/typescript**: These plugins provide rules for checking imports in the code. They help detect issues related to import paths, such as nonexistent modules or incorrectly written paths. The plugin:import/typescript is adapted for TypeScript.
9. **plugin:unicorn/recommended**: Unicorn is a set of ESLint rules created to simplify the rule selection process. It offers a set of "definitive" solutions to many style coding questions, helping to make the code more uniform and understandable.
10. **prettier**: Prettier is a code formatting tool that can be integrated with ESLint through the eslint-config-prettier plugin. It automatically formats files according to certain rules, making the code more readable and consistent.

# Benefits of using @atomazing-org/eslint-config:
The ESLint configuration is stored in an npm repository, making it accessible to all team members. This ensures that all project participants adhere to the same coding standards, promoting the unification of the development process and improving code quality. Moreover, with the extracted ESLint configuration, integrating linting into continuous integration (CI) and delivery (CD) processes becomes easy. This automates the code check against standards before deployment, reducing the risk of introducing errors into production. Storing the ESLint configuration in an npm repository simplifies collaborative work on the project. If there is no eslint on the project, it can be easily installed, and there is no need to create a new configuration from scratch for a new project.

Main components of the configuration:
1. **ignorePatterns**: Defines directories or files that ESLint should ignore during code checking. Includes node_modules, dist, and.eslintrc.js.  
   env: Indicates environments where the code will run. Here, browser, es2023, and node are specified, allowing the use of modern ECMAScript features and Node.js APIs.
2. **parserOptions**: Parser settings, including the ECMAScript version (ecmaVersion: 2023) to support the latest language capabilities.
3. **extends**: List of configuration extensions used to add additional rules from various sources, such as Airbnb, TypeScript ESLint, Prettier, and others.
4. **settings**: Configuration for the import/resolver plugin, indicating that path resolution should be performed both for Node.js and TypeScript.
5. **rules**: List of specific ESLint rules applied to the project. These rules cover a wide range of coding aspects, including requirements for ESLint comments, import usage, filename naming styles, operator preferences, and much more.