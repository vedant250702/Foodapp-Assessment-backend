// tests/setup.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  console.log('In-memory MongoDB started for tests');
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  console.log('In-memory MongoDB stopped');
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});