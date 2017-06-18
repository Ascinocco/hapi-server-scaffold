module.exports = {
    origins: ['*'],
    allowCredentials: 'true',
    exposeHeaders: ['content-type', 'content-length', 'authorization'],
    maxAge: 600,
    methods: ['POST, GET, PUT, DELETE, OPTIONS'],
    headers: ['Accept', 'Content-Type', 'Authorization', 'authorization']
};