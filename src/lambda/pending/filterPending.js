const Responses = require("../../common/ApiResponses");
const Dynamo = require("../../common/Dynamo");

const tableName = "PendingTable";

const filterPending = async (event) => {
    if (!event.pathParameters.description) {
        return Responses._400({ message: 'Missing the description' });
    }

    const { description } = event.pathParameters;

    const pendings = await Dynamo.filter({
        tableName,
        queryKey: 'description',
        queryValue: description,
    });

    return Responses._200(pendings);
}

module.exports = {
    filterPending,
};
