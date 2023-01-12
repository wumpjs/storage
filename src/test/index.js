import { Storage } from "../index.js";
const db = new Storage();

db.set("a", 5);
db.clear();

console.log(db.information().usedStorage);