const { Schema, model, connection } = require("mongoose");

//Create a Schema for person
const personSchema = new Schema({
  name: String,
  number: String,
});
//Set the form to transform method toJSON
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    (returnedObject.id = returnedObject._id),
      delete returnedObject._id,
      delete returnedObject.__v;
  },
});
//Create a model for person
const Person = model("Person", personSchema);

/* const person = new Person({
  name: "Probando mongoose",
  number: 123,
});

person
  .save()
  .then((result) => {
    console.log(result);
    connection.close();
  })
  .catch((err) => {
    console.error(err);
  }); */

module.exports = Person;
