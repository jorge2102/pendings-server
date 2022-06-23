const Responses = require("../../common/ApiResponses");
const Dynamo = require("../../common/Dynamo");

const tableName = "PendingTable";

const getPendings = async (event) => {
    const pendings = await Dynamo.getAll(tableName);

    if (!pendings) {
        return Responses._404({ message: 'Failed to get pendings' });
    }

    return Responses._200({ pendings });
};

module.exports = {
    getPendings,
};