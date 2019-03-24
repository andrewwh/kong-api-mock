const path = require('path')
const fs = require('fs-plus')

function readConfigurationFiles(dir, env) {
    const kong = {
        services: {},
        routes: {},
        upstreams: {},
        targets: {}
    }

    readServices(kong.services, path.join(dir, 'services'))
    if (env) {
        readServices(kong.services, path.join(dir, 'services', env))        
    }

    readRoutes(kong.routes, path.join(dir, 'routes'))
    if (env) {
        readRoutes(kong.routes, path.join(dir, 'routes', env))        
    }   
    
    readUpstreams(kong.upstreams, path.join(dir, 'upstreams'))
    if (env) {
        readUpstreams(kong.upstreams, path.join(dir, 'upstreams', env))        
    }      

    readTargets(kong.targets, path.join(dir, 'targets'))
    if (env) {
        readTargets(kong.targets, path.join(dir, 'targets', env))        
    }      

    return kong
}

function readServices(services, dir) {
    if (fs.isDirectorySync(dir)) {
        const list = fs.listSync(dir, ['json'])
        list.forEach(file => {
            const service = JSON.parse(fs.readFileSync(file))
            if (list[service.name]) {
                console.error(`Found duplicate service ${service.name} in ${file}`)
                return
            }

            services[service.name] = service

            console.debug(`Loading service ${service.name}`)
        });
    } else {
        console.debug(`Service directory ${dir} not found`)
    }
}

function readRoutes(routes, dir) {
    if (fs.isDirectorySync(dir)) {
        const list = fs.listSync(dir, ['json'])
        list.forEach(file => {
            const route = JSON.parse(fs.readFileSync(file))

            if (routes[route.name]) {
                console.error(`Found duplicate route ${route.name} in ${s}`)
                return
            }

            routes[route.name] = route

            console.debug(`Loading route ${route.name}`)
        });
    } else {
        console.info(`Route directory ${dir} not found`)
    }
}

function readUpstreams(upstreams, dir) {
    if (fs.isDirectorySync(dir)) {
        const list = fs.listSync(dir, ['json'])
        list.forEach(file => {
            const upstream = JSON.parse(fs.readFileSync(file))

            if (upstreams[upstream.name]) {
                console.error(`Found duplicate upstream ${upstream.name} in ${s}`)
                return
            }

            upstreams[upstream.name] = upstream

            console.debug(`Loading upstream ${upstream.name}`)
        });
    } else {
        console.info(`Upstreams directory ${dir} not found`)
    }    
}

function readTargets(targets, dir) {
    if (fs.isDirectorySync(dir)) {
        const list = fs.listSync(dir, ['json'])
        list.forEach(file => {
            const target = JSON.parse(fs.readFileSync(file))

            if (targets[target.name]) {
                console.error(`Found duplicate target ${target.name} in ${s}`)
                return
            }

            targets[target.target] = target

            console.debug(`Loading target ${target.target}`)
        });
    } else {
        console.info(`Targets directory ${dir} not found`)
    }       
}

module.exports.readConfigurationFiles = readConfigurationFiles