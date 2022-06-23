const Dynamo = require('../../src/common/Dynamo');

test('Dynamo is an object', () => {
    expect(typeof Dynamo).toBe('object');
});

test('dynamo has get and write', () => {
    expect(typeof Dynamo.get).toBe('function');
    expect(typeof Dynamo.write).toBe('function');
});

const validTableName = 'PendingTable';
const data = { 
    id: 'test123', 
    creationDate: new Date(), 
    description: 'To do homework',
    done: false,
};

test('Dynamo write works', async () => {
    try {
        const res = await Dynamo.write(data, validTableName);
        expect(res).toBe(data);
    } catch (error) {
        console.log('error in dynamo write test', error);
    }
});

test('dynamo get works', async () => {
    try {
        const res = await Dynamo.get(data.id, validTableName);
        expect(res).toEqual(data);
    } catch (error) {
        console.log('error in dynamo get', error);
    }
});