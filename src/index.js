import Storage from "./dist/Storage.js";
const storage = new Storage();

for (let index = 0; index < 100; index++) storage.set(`Index-${index}`, index + 1);

storage.set("A2", 0)
storage.replaceAllKeys({ value: 0, replaceWith: "A1" });

console.log(storage.get("A1"))