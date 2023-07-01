import Storage from "../index.js";
const db = new Storage({
    size: "AAAAA"
});

db.set("a", 5);
db.clear();