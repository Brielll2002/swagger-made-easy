# Install Lib

- ```npm i @brielll2002/swagger-made-easy```

# Example of use

const Swagger = require('@brielll2002/swagger-made-easy')

Swagger(['http://localhost:3100/path-exemple', 'http://localhost:3100/path-exemple'], (err, swg)=>{
    if(err)console.error(err)

    const swagger = swg

    app.use('/api-docs', swagger.serve, swagger.setup())

    console.log('documentation path: "/api-docs"')
})

- Explanation:  
The Swagger function has a parameter and a callback function.
The parameter is an array, which must contain the endpoints of your API. The callback needs to be called so that the documentation can be accessed through the path that will appear in the console.

- Explicação:  
A função Swagger possui um parâmetro e uma função callback.
O parâmetro se trata de um array, que deve conter os endpoints da sua API, a callback precisa ser chamada para que a documentação possa ser acessada através do caminho que aparecerá no console.

## Documentação Swagger

[https://swagger.io/docs](https://swagger.io/docs)
