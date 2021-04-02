const entryQuestions = require('./entry');
const { langQuestionHandler, LangType, getBabelLoader, getTypescriptLoader } = require('./languageSupport');
const { plugins, replaceAt, generatePluginName } = require('./plugins');
const {styleQuestionHandler,  StylingType, LoaderName, StyleRegex, Loader } = require('./styleSupport');
const tooltip = require('./tooltip');
const validate = require('./validate');
const { getDefaultOptimization } = require('./webpackConfig');

module.exports = {
    entryQuestions,
    langQuestionHandler,
    LangType,
    getBabelLoader,
    getTypescriptLoader,
    plugins,
    replaceAt,
    generatePluginName,
    styleQuestionHandler,
    StylingType,
    LoaderName,
    StyleRegex,
    Loader,
    tooltip,
    validate,
    getDefaultOptimization,
};
