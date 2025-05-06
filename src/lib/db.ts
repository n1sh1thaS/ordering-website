import { MongoClient } from 'mongodb';

const uri : string | undefined = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise : Promise<MongoClient>;

if (!uri) {
  throw new Error('Add Mongo URI to .env');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}
export default clientPromise;