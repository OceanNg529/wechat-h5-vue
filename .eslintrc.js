module.exports = {
    "root": true,
    "env": {
        "node": true
    },
    "extends": [
        "plugin:vue/essential",
        "eslint:recommended"
    ],
    "parserOptions": {
        "parser": "babel-eslint"
    },
    "rules": {
        "no-useless-escape": 0,
        "no-unused-vars": 'off',
        "no-async-promise-executor": 2
    }
}