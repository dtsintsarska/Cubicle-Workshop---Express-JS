module.exports = {
    development: {
        port: process.env.PORT || 3000,
        DB_url: `mongodb+srv://dbUser:${process.env.DB_pass}@starter-jgnm4.azure.mongodb.net/Cubicles?retryWrites=true&w=majority`
    },
    production: {}
};