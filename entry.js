const Generator = require('yeoman-generator');
const { Input, InputValidate } = require('@webpack-cli/webpack-scaffold');

const validate = require('./validate');

/**
 *
 * Prompts for entry points, either if it has multiple or one entry
 *
 * @param	{Object} self 	- A variable holding the instance of the prompting
 * @param	{Object} answer - Previous answer from asking if the user wants single or multiple entries
 * @returns	{Object} An Object that holds the answers given by the user, later used to scaffold
 */

export default async function entry(self, multiEntries, autoGenerateDefaults = false) {
    const fixEntry = (entry) => {
        entry = entry.trim().replace(/"|'/g, '');
        if (!entry.startsWith('./')) {
            entry = `./${entry}`;
        }
        if (!entry.endsWith('.js')) {
            entry = entry.concat('.js');
        }
        entry = `'${entry}'`;
        return entry;
    };

    if (multiEntries) {
        const webpackEntryPoint = {};

        const multipleEntriesAnswer = await InputValidate(
            self,
            'multipleEntries',
            'What do you want to name your bundles? (separated by comma)',
            validate,
            'pageOne, pageTwo',
            autoGenerateDefaults,
        );

        const entryIdentifiers = multipleEntriesAnswer.multipleEntries.split(',');

        for (let i = 0; i < entryIdentifiers.length; i++) {
            const entryProp = entryIdentifiers[i].trim();
            const entryResult = await InputValidate(
                self,
                `${entryProp}`,
                `What is the location of "${entryProp}"?`,
                validate,
                `src/${entryProp}`,
                autoGenerateDefaults,
            );
            const entry = fixEntry(entryResult[entryProp]);
            webpackEntryPoint[entryProp] = entry;
        }

        return webpackEntryPoint;
    }
    const singleEntryResult = await Input(
        self,
        'singularEntry',
        'Which will be your application entry point?',
        'src/index',
        autoGenerateDefaults,
    );
    let { singularEntry } = singleEntryResult;
    if (singularEntry.length > 0) {
        singularEntry = fixEntry(singularEntry);
    }
    return singularEntry;
}