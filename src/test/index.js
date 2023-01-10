import { getDurationFromMonoBuffer } from "discord-speech-recognition";
import { Storage } from "../index.js";
const db = new Storage();

db.set('a', 1);
db.set('b', "sa");
db.set("c", 3);
const data = new Array();

console.log(db.get('a'));  
db.substract("a", 1);
console.log(db.get('a'));  
console.log(db.typeof('b'));  
console.log(db.has('a'));  
console.log(db.map(function(value, key, index, t) { console.log(value, key, index, t) }));  
console.log(db.find((value, key, thi) => console.log(key, value, thi))); 
db.filter((value, key, index, t) => { value === 3 ? data.push(key) : ""; });
console.log(data);
//db.delete("wewqewqe")
console.log(db.toJSON());
db.clear();
console.log(db.toJSON());
