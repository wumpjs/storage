import { Storage } from "../index.js";
const db = new Storage();

db.set('a', 1);
db.set('b', "sa");
db.set('c', 3);

console.log(db.get('a'));  
console.log(db.typeof('b'));  
console.log(db.has('a'));  
console.log(db.map(function(value, key, index, t) {
    console.log(value, key, index, t)
}));  
console.log(db.find((value, key, thi) => console.log(key, value, thi))); 
console.log(db.filter((key, value) => console.log(key, value)));  
console.log(db.toJSON());