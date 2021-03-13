require("dotenv").config();
require("./mongodb");
const express = require("express");
const cors = require("cors");
const Person = require("./models/Person");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.send(
    "<h1> wellcome API Phonebook</h1><br /><h2>Url: api/persons</h2>"
  );
});
app.get("/api/persons", (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findById(id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });
});
//Realiza la accion directamente
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id).then(() => {
    response.status(204).end();
  });
});
app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (body === undefined) {
    return response
      .status(400)
      .json({ error: "The name or number is missing" });
  }
  console.log(body.name, typeof body.name);
  Person.findOne({ name: body.name }).then((person) => {
    console.log(person);
    if (person !== null) {
      return response
        .status(400)
        .json({ error: "The name already exist in the phonebook" });
    } else {
      const person = new Person({
        name: body.name,
        number: body.number,
      });
      person.save().then((savePerson) => {
        response.json(savePerson);
      });
    }
  });
});
app.get("/info", (request, response) => {
  let info =
    "<p>Phonebook has info for " +
    persons.length +
    " people<br/><br/>" +
    new Date() +
    "</p>";
  response.send(info);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
