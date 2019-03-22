#!/usr/bin/env node

const program = require('commander')
const fs = require('fs-plus')
const got = require('got')
const path = require('path')

function readConfigurationFiles(dir) {
    const kong = {
        services: {},
        routes: {},
        upstreams: {},
        targets: {}
    }

    const servicesDir = path.join(dir, 'services');
    if (fs.isDirectorySync(servicesDir)) {
        const services = fs.listSync(servicesDir, ['json'])
        services.forEach(file => {
            const service = JSON.parse(fs.readFileSync(file))
            if (kong.services[service.name]) {
                console.error(`Found duplicate service ${service.name} in ${file}`)
                return
            }

            kong.services[service.name] = service

            console.debug(`Loading service ${service.name}`)
        });
    } else {
        console.debug(`Service directory ${servicesDir} not found`)
    }

    const routesDir = path.join(dir, 'routes');
    if (fs.isDirectorySync(routesDir)) {
        const routes = fs.listSync(routesDir, ['json'])
        routes.forEach(file => {
            const route = JSON.parse(fs.readFileSync(file))

            if (kong.routes[route.name]) {
                console.error(`Found duplicate route ${route.name} in ${s}`)
                return
            }

            kong.routes[route.name] = route

            console.debug(`Loading route ${route.name}`)
        });
    } else {
        console.info(`Route directory ${routesDir} not found`)
    }

    return kong;
}

async function applyServices(host, kong) {
    for (const name of Object.keys(kong.services)) {
        const url = `${host}/services/${name}`;

        console.debug(`Executing service upsert PUT ${url}`)

        try {
            const response = await got.put(url, {
                body: kong.services[name],
                json: true
            })

            console.debug(`Service ${name} created with id ${response.body.id}`)
            kong.services[name].id = response.body.id
        } catch (ex) {
            if (ex instanceof HttpError) {
                console.error(`Error creating service ${ex.message} ${ex.body.message}`);
            } else {
                console.error(ex.message)
            }
        }
    }
}

async function applyRoutes(host, kong) {
    for (const name of Object.keys(kong.routes)) {
        const route = kong.routes[name]

        if (!route.service && route.service.name == undefined) {
            console.error(`Cannot apply route ${name} without service name in service attribute`)
            return
        }

        const service = kong.services[route.service.name]

        if (service == undefined) {
            console.error(`Cannot find service ${route.service.name} when applying route ${name}`)
            return
        }

        if (!service.id) {
            console.error(`Service ${route.service.name} does not have an id when applying route ${name}. Check the service has been created`)
            return
        }

        route.service.id = service.id
        const url = `${host}/routes/${route.name}`;

        console.debug(`Executing route upsert PUT ${url}`)

        try {
            const response = await got.put(url, {
                body: route,
                json: true
            })

            console.debug(`Route ${name} created with id ${response.body.id}`)
            kong.routes[name].id = response.body.id
        } catch (ex) {
            if (ex instanceof HttpError) {
                console.error(`Error creating route ${ex.message} ${ex.body.message}`)
            } else {
                console.error(ex.message)
            }
        }
    }
}

async function main(argv) {
    program
        .version('1.0.0')
        .option('-c, --config <path>', 'Kong config directory', './kong-config')
        .option('-h, --host [host]', 'Kong admin host (and port)', 'http://localhost:8001')
        .parse(argv);

    if (program.config == undefined) {
        console.log('Missing parameter: Kong config directory')
        program.outputHelp()
        process.exit()
    }

    const kong = readConfigurationFiles(program.config)

    await applyServices(program.host, kong)
    await applyRoutes(program.host, kong)
}
main(process.argv)