const { urlencoded } = require("express");
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const URL = process.env.MONGO_URL ?? "mongodb://localhost:27017";

const DATABASE_NAME = "Cattery";
const COLLECTION_NAME = "Coordinators";
const COLLECTION_SESSIONS = "Sessions";
const COLLECTION_CATS = "Cats"; //TER UM BOLEANO PARA SABER SE FOI ADOTADO OU NAO
const COLLECTION_STOCK = "Stock";

let client;
async function connectToMongo() {
  try {
    if (!client) {
      client = await MongoClient.connect(URL);
    }
    return client;
  } catch (err) {
    console.log(err);
  }
}

async function getMongoCollection(dbName, collectionName) {
  const client = await connectToMongo();
  return client.db(dbName).collection(collectionName);
}

async function createAcc(acc) {
  const collection = await getMongoCollection(DATABASE_NAME, COLLECTION_NAME);
  const result = await collection.insertOne(acc);
  return result.insertedId;
}

async function readUsers() {
  const collection = await getMongoCollection(DATABASE_NAME, COLLECTION_NAME);
  const result = await collection.find().toArray();
  return result;
}

//SESSIONS
async function createSessions({ userName, userId }) {
  const collection = await getMongoCollection(
    DATABASE_NAME,
    COLLECTION_SESSIONS
  );
  const result = await collection.insertOne({ userName, userId });
  return result.insertedId;
}

async function findSessionById(id) {
  if (!ObjectId.isValid(id)) return null;
  const collection = await getMongoCollection(
    DATABASE_NAME,
    COLLECTION_SESSIONS
  );
  const doc = await collection.findOne({ _id: ObjectId(id) });
  return doc;
}

async function findUserById(id) {
  if (!ObjectId.isValid(id)) return null;
  const collection = await getMongoCollection(DATABASE_NAME, COLLECTION_NAME);
  const doc = await collection.findOne({ _id: ObjectId(id) });
  return doc;
}

async function findDocumentByUser(username) {
  const collection = await getMongoCollection(DATABASE_NAME, COLLECTION_NAME);
  const doc = await collection.findOne({ UserName: { $eq: username } });
  return doc;
}

//CATS
async function createCat(cat){
  const collection = await getMongoCollection(DATABASE_NAME, COLLECTION_CATS);
  const result = await collection.insertOne(cat);
  return result.insertedId;
}

async function getCattery(username){
  const collection = await getMongoCollection(DATABASE_NAME, COLLECTION_CATS);
  const result = await collection.find({cattery: username}).toArray();
  return result;
}

//STOCK
async function createStock(stock){
  const collection = await getMongoCollection(DATABASE_NAME, COLLECTION_STOCK);
  const result = await collection.insertOne(stock);
  return result.insertedId;
}

async function getStock(username){
  const collection = await getMongoCollection(DATABASE_NAME, COLLECTION_STOCK);
  const doc = await collection.findOne({ UserName: username });
  return doc;
}

async function updateStock(username, food, water, savings){
  const collection = await getMongoCollection(DATABASE_NAME, COLLECTION_STOCK);
  const result = await collection.updateOne(
    { UserName: username },
    { $set: { NeededFood: food,
              NeededWater: water,
              Savings: savings } 
    }
  );
  return result.upsertedId;
}

async function updateGoods(username, food, water, savings, medicine){
  const collection = await getMongoCollection(DATABASE_NAME, COLLECTION_STOCK);
  const result = await collection.updateOne(
    { UserName: username },
    { $set: { CurrentFood: food,
              CurrentWater: water,
              Savings: savings,
              CurrentMedicine: medicine
            } 
    }
  );
  return result.upsertedId;
}

module.exports = {
    createAcc,
    readUsers,
    findSessionById,
    createSessions,
    findUserById,
    findDocumentByUser,
    createCat,
    createStock,
    updateStock,
    updateGoods,
    getStock,
    getCattery,
}