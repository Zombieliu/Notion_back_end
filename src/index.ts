import * as path from "path";
import { HttpServer } from "tsrpc";
import { serviceProto } from "./shared/protocols/serviceProto";
import {AppDataSource} from "./data-source";
import dc_bot_serve_start from "./scripts/dcbot";

// Create the Server
const server = new HttpServer(serviceProto, {
    // apiTimeout:9999999,
    port: 3001,
    // Remove this to use binary mode (remove from the client too)
    json: true
});

// Initialize before server start
async function init() {
    // Auto implement APIs
    await server.autoImplementApi(path.resolve(__dirname, 'api'));

    // TODO
    // Prepare something... (e.g. connect the db)
    await AppDataSource.initialize()
};

// Entry function
async function main() {
    await init()
    await server.start()
    await dc_bot_serve_start()
};
main();
