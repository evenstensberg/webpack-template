const jscodeshift = require('jscodeshift');
const Generator = require('yeoman-generator');

export function createArrowFunction(value) {
    return `() => '${value}'`;
}

export function createRegularFunction(value) {
    return `function () {\n return '${value}'\n}`;
}

export function createDynamicPromise(arrOrString) {
    if (Array.isArray(arrOrString)) {
        return (
            '() => new Promise((resolve) => resolve([' +
            arrOrString.map((func) => {
                return "'" + func + "'";
            }) +
            ']))'
        );
    } else {
        return `() => new Promise((resolve) => resolve('${arrOrString}'))`;
    }
}

export function createAssetFilterFunction(value) {
    return `function (assetFilename) {\n return assetFilename.endsWith('.${value}');\n}`;
}

export function createExternalFunction(regexp) {
    return (
        '\n function (context, request, callback) {\n if (' +
        '/' +
        regexp +
        '/.test(request)){' +
        '\n' +
        "   return callback(null, 'commonjs' + request);\n}\n" +
        'callback();\n}'
    );
}

export function parseValue(regexp) {
    return jscodeshift(regexp);
}

export function createRequire(val) {
    return `const ${val} = require('${val}');`;
}

export function List(
    self,
    name,
    message,
    choices,
    defaultChoice,
    skip = false,
) {
    if (skip) return { [name]: defaultChoice };

    return self.prompt([
        {
            choices,
            message,
            name,
            type: 'list',
            default: defaultChoice,
        },
    ]);
}

export function RawList(name, message, choices) {
    return {
        choices,
        message,
        name,
        type: 'rawlist',
    };
}

export function CheckList(name, message, choices) {
    return {
        choices,
        message,
        name,
        type: 'checkbox',
    };
}

export function Input(self, name, message, defaultChoice?, skip = false) {
    if (skip) return { [name]: defaultChoice };
    return self.prompt([
        {
            default: defaultChoice,
            message,
            name,
            type: 'input',
        },
    ]);
}

export function InputValidate(
    self,
    name,
    message,
    cb,
    defaultChoice,
    skip = false,
) {
    if (skip) return { [name]: defaultChoice };
    const input = {
        message,
        name,
        type: 'input',
        validate: cb,
    };
    if (defaultChoice) input.default = defaultChoice;
    return self.prompt([input]);
}

export function Confirm(self, name, message, defaultChoice = true, skip = false) {
    if (skip) return { [name]: defaultChoice };

    return self.prompt([
        {
            default: defaultChoice,
            message,
            name,
            type: 'confirm',
        },
    ]);
}

export function AutoComplete(name, message, options) {
    return Object.assign(
        {
            message,
            name,
            type: 'autocomplete',
        },
        options,
    );
}
