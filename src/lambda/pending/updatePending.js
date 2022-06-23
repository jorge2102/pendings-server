const Responses = require("../../common/ApiResponses");
const Dynamo = require("../../common/Dynamo");

const middy = require("@middy/core");
const httpJSONBodyParser = require("@middy/http-json-body-parser");

const tableName = "PendingTable";

const updatePending = async (event) => {
    const { id } = event.pathParameters;

    const { description, done } = event.body;

    await Dynamo
        .update({
            tableName,
            id,
            updateExp: "set description = :description, done = :done",
            expAttrValues: {
                ":description": description,
                ":done": done,
            },
        });

    return Responses._200({ message: "Pending updated" });
};

module.exports = {
    updatePending: middy(updatePending).use(httpJSONBodyParser()),
};