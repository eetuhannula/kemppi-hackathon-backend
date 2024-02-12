// Node modules
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');

// API operations
const db = require('./database');
const addMachine = require('./addMachine.js');
const removeMachine = require('./removeMachine.js')
const getAllMachines = require('./getAllMachines.js');
const fetchProductList = require('./fetchProductList.js');

const app = express();
const port = 3000;
app.use(express.json());

// Updating productList requires app reboot to update... 
// ... or to use nodecron etc in the future (implement later if time)
let productList;  
fetchProductList().then(products => {
    productList = products;
    }).catch(error => {
});

app.get('/', (req, res) => {
  res.send('Täällä elää mörkö.');
});

// Swagger / OpenAPI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/getAllMachines', (req, res) => {
  getAllMachines((err, rows) => {
    if (err) {
      res.status(400).send("Failed to retrieve machines");
      console.error(err.message);
    } else {
      res.json(rows);
    }
  });
});

app.post('/addMachine', (req, res) => { 

    const { productNumber, description, } = req.body;

    // Call addMachine function with the extracted data
    addMachine(productNumber, description)
        .then(() => {
            res.status(201).send({ message: "Machine successfully added" });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ error: "Failed to add the machine" });
        });
});

app.post('/removeMachine', (req, res) => {
  const { id } = req.body; // Assuming the ID is sent in the request body

  if (!id) {
    return res.status(400).send("Machine ID is required");
  }

  removeMachine(id, (err, changes) => {
    if (err) {
      res.status(500).send("Failed to remove machine");
      console.error(err.message);
    } else if (changes === 0) {
      res.status(404).send("Machine not found");
    } else {
      res.send("Machine removed successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});