import {HttpClient} from "tsrpc-browser";

import {serviceProto} from "../shared/protocols/serviceProto";

const notion_client = new HttpClient(serviceProto, {
    // server: 'https://api.tintinland.com',
    timeout:999999,
    server: " http://localhost:3001",
    json: true,
    // logger: console
});



export {
    notion_client
}
