import * as path from "path";
import { HttpServer } from "tsrpc";
import { serviceProto } from "./shared/protocols/serviceProto";
// import {AppDataSource} from "./data-source";
require('dotenv').config()

// Create the Server
const port = process.env.PORT
const server = new HttpServer(serviceProto, {
    apiTimeout:9999999,
    port: Number(port),
    // Remove this to use binary mode (remove from the client too)
    json: true
});

// Initialize before server start
async function init() {
    // Auto implement APIs
    await server.autoImplementApi(path.resolve(__dirname, 'api'));
    // TODO
    // Prepare something... (e.g. connect the db)
    // await AppDataSource.initialize()
};

// Entry function
async function main() {
    await init()
    await server.start()

};
main();
