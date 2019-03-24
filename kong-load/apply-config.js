const got = require('got')

async function applyAll(host, config) {
    await applyServices(host, config)
    await applyRoutes(host, config)

    /*
    ** Do not have a use case for this yet
    
    await applyUpstreams(program.host, config)
    await applyTargets(program.host, config)
    */    
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
            if (ex.hasOwnProperty('body')) {
                console.error(`Error creating service ${ex.message} ${ex.body.message}`);
            } else {
                console.error(ex.message)
            }
        }
    }
}

async function applyUpstreams(host, kong) {
    for (const name of Object.keys(kong.upstreams)) {
        const url = `${host}/upstreams/${name}`;

        console.debug(`Executing upstream upsert PUT ${url}`)

        try {
            const response = await got.put(url, {
                body: kong.upstreams[name],
                json: true
            })

            console.debug(`Upstream ${name} created with id ${response.body.id}`)
            kong.upstreams[name].id = response.body.id
        } catch (ex) {
            if (ex.hasOwnProperty('body')) {
                console.error(`Error creating upstream ${ex.message} ${ex.body.message}`);
            } else {
                console.error(ex.message)
            }
        }
    }
}

async function applyRoutes(host, kong) {
    for (const name of Object.keys(kong.routes)) {
        const route = kong.routes[name]

        console.debug(`Applying route ${name}`)
        
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
            if (ex.hasOwnProperty('body')) {
                console.error(`Error creating route ${ex.message} ${ex.body.message}`)
            } else {
                console.error(ex.message)
            }
        }
    }
}

async function applyTargets(host, kong) {
    for (const name of Object.keys(kong.targets)) {
        const target = kong.targets[name]

        if (!target.upstreams && target.upstream.name == undefined) {
            console.error(`Cannot apply target ${name} without target name in upstreams attribute`)
            return
        }

        const upstream = kong.upstreams[target.upstream.name]

        if (upstream == undefined) {
            console.error(`Cannot find upstream ${target.upstream.name} when applying target ${name}`)
            return
        }

        if (!upstream.id) {
            console.error(`Upstream ${target.upstream.name} does not have an id when applying target ${name}. Check the upstream has been created`)
            return
        }

        target.upstream.id = upstream.id
        const url = `${host}/upstreams/${target.upstream.id}/targets`;

        console.debug(`Creating target POST ${url}`)

        try {
            const response = await got.post(url, {
                body: target,
                json: true
            })

            console.debug(`Target ${name} created with id ${response.body.id}`)
            kong.targets[name].id = response.body.id
        } catch (ex) {
            if (ex.hasOwnProperty('body')) {
                console.error(`Error creating route ${ex.message} ${ex.body.message}`)
            } else {
                console.error(ex.message)
            }
        }
    }
}

module.exports.applyAll = applyAll