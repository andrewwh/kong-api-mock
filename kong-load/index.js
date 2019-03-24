#!/usr/bin/env node

const program = require('commander')
const load = require('./load-config')
const apply = require('./apply-config')

async function main(argv) {
    program
        .version('1.0.0')
        .option('-c, --config <path>', 'Kong config directory', './kong-config')
        .option('-e, --environment [env]', 'Kong environemnt')
        .option('-h, --host [host]', 'Kong admin host (and port)', 'http://localhost:8001')
        .parse(argv);

    if (program.config == undefined) {
        console.log('Missing parameter: Kong config directory')
        program.outputHelp()
        process.exit()
    }

    const config = load.readConfigurationFiles(program.config, program.environment)

    apply.applyAll(program.host, config);

}
main(process.argv)