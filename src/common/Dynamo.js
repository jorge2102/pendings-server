const AWS = require("aws-sdk");

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get(id, TableName) {
        const params = {
            TableName,
            Key: { id },
        };

        const data = await documentClient.get(params).promise();

        if (!data || !data.Item) {
            throw Error(`There was an error fetching the data for ID of ${id} from ${TableName}`);
        }

        return data.Item;
    },

    async write(data, TableName) {
        if (!data.id) {
            throw Error('no ID on the data');
        }

        const params = {
            TableName,
            Item: data,
        };

        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(`There was an error inserting in table ${TableName}`);
        }

        return data;
    },

    update: async ({ tableName, id, updateExp, expAttrValues }) => {
        if (!updateExp || !expAttrValues) {
            throw Error(`There was an error inserting params`);
        }

        const params = {
            TableName: tableName,
            Key: { id },
            UpdateExpression: updateExp,
            ExpressionAttributeValues: expAttrValues,
            ReturnValues: "ALL_NEW",
        };

        return documentClient.update(params).promise();
    },

    async getAll(TableName) {
        const params = {
            TableName,
        };

        const data = await documentClient.scan(params).promise();

        if (!data || !data.Items) {
            throw Error(`There was an error fetching the data from ${TableName}`);
        }

        return data.Items;
    },

    query: async ({ tableName, index, queryKey, queryValue }) => {
        const params = {
            TableName: tableName,
            IndexName: index,
            KeyConditionExpression: `${queryKey} = :hkey`,
            ExpressionAttributeValues: {
                ':hkey': queryValue,
            },
        };

        const res = await documentClient.query(params).promise();
        return res.Items || [];
    },

    filter: async ({ tableName, queryKey, queryValue }) => {
        const params = {
            TableName: tableName,
            FilterExpression: `contains(${queryKey}, :hkey)`,
            ExpressionAttributeValues: {
                ':hkey': queryValue,
            },
        };

        const res = await documentClient.scan(params).promise();
        return res.Items || [];
    },
};

module.exports = Dynamo;