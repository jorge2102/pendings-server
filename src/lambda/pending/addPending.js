const Responses = require("../../common/ApiResponses");
const Dynamo = require("../../common/Dynamo");
const { v4 } = require("uuid");

const middy = require("@middy/core");
const httpJSONBodyParser = require("@middy/http-json-body-parser");

const tableName = "PendingTable";

const addPending = async (event) => {
    const { description } = event.body;
    const creationDate = new Date();
    const id = v4();

    console.log("created id: ", id);

    const newPending = {
        id,
        creationDate,
        description,
        done: false,
    };

    const newPendingDB = await Dynamo.write(newPending, tableName);

    if (!newPendingDB) {
        return Responses._400({ message: 'Failed to write pending' });
    }

    return Responses._200({ newPendingDB });
};

module.exports = {
    addPending: middy(addPending).use(httpJSONBodyParser()),
};