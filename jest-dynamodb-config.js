module.exports = {
    tables: [
        {
            TableName: 'PendingTable',
            KeySchema: [
                {
                    AttributeName: 'id',
                    KeyType: 'HASH',
                },
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'id',
                    AttributeType: 'S',
                },
            ],
            BillingMode: 'PAY_PER_REQUEST',
        },
    ],
};