import { Storage } from "../Storage";
const db = new Storage<any>();

db.on("dataSaved", (key, value, data) => console.log(key, value, data));

db.set("a", 0);