import { Storage } from "../Storage";
const db = new Storage<number>();

db.set();
db.set("a", 0);
db.clear();

console.log(db.information().usedStorage);