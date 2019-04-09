module.exports = {
    "database" : {
        "username": process.env.databaseuser || "user",
        "password": process.env.databasepassword || "pass",
        "port": process.env.databaseport || "27017",
        "uri": process.env.databaseuri || "127.0.0.1",
        "collection": process.env.databasecollection || "collection"
    },
    "server":{
        "accessToken": process.env.accesstoken || "123secure"
    }
};