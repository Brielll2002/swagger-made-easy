const fs = require('fs')
const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.urlencoded({
    extended: true
}))

const inMethod = {
    "sumary":"",
    "description":"",
    "parameters": [],
    "requestBody":{
        "required":true,
        "content":{
            "<ex:application/json>":{
                "schema":{
                    "type":"<ex:object>",
                    "properties":{},
                    "required":[""]
                }
            }
        },
        "responses":{
            "<ex:200>":{
                "description": "",
                "content": {
                    "<ex:application/json>": {
                        "schema": {
                            "type": "<ex:object>",
                            "properties": {}
                        }
                    }
                }
            }
        }
    }  
}

async function getMethods(url){
    const data = await axios.options(url)
    return data.data
}

async function main(urls, callback){
    try {
        const swagger = require('swagger-ui-express')
        
        const Swagger = {
            "openapi": "3.1.0",
            "info": {
                "title": "",
                "description": "",
                "version": ""
            },
            "externalDocs": {
                "description": "",
                "url": ""
            },
            "basePath": "/",
            "paths": {}
        }

        for (const url of urls) {
            const res = await getMethods(url)
            const methods = res.split(',')

            const path = new URL(url).pathname

            const pathMethods = {} 

            methods.forEach(method => {
                const trimmedMethod = method.trim().toLowerCase()
                pathMethods[trimmedMethod] = inMethod
            })

            Swagger.paths[path] = pathMethods
        }

        const jsonData = JSON.stringify(Swagger, null, 2)
        fs.writeFile('swagger.json', jsonData, (err) => {
            if (err){
                console.error(err)
                return callback(err, null)
            }

            return callback(null, swagger)
        })

        
    }
    catch(error){
        if(error)console.error(error)
    }
}

module.exports = main