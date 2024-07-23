import express from "express";

import {
  deleteAstronautById,
  updateAstronautById,
  getAstronautsByName,
  replaceAstronautById,
  getAstronauts,
  createAstronaut,
  getAstronautById,
} from "./models/astronauts.js";

const app = express();

app.use(express.json());

/* 

All json responses for this tasks should follow the pattern:

res.json({
  "success": boolean,
  "payload": returnedData
})

*/

// Task 1

/* Write a request handler to return the correct response when a `GET` request is received to `/astronauts`. Choose the appropriate 
function from the imported functions at the top of the `app.js` to get your data. */

app.get('/astronauts', async (req, res) => {
  try {
    const astronauts = await getAstronautsByName(req.query.name);
    if (astronauts.length === 0) {
      res.send("No astronaut found with that name")
    }
    console.log(astronauts)
    res.json({ success: true, payload: astronauts });
  } catch (error) {
    res.status(500).send("Error processing request")
  }
});

// Task 2

/* Write a request handler to return the correct response and perform the correct action when a `POST` request is received to 
`/astronauts`. Choose the appropriate function from the imported functions at the top of the `app.js` to perform the action. */

app.post('/astronauts', async (req, res) => {
  try {
    const newAstronaut = await createAstronaut(req.body.astronaut);
    res.json({ success: true, payload: newAstronaut })
  } catch(error) {
    res.status(500).send("Error processing request")
  }
})

// Task 3

/* Write the request handler to return the data from the function getAstronautById. Have this handler listen to requests at the 
appropriate path. */

app.get('/astronauts/:id', async (req, res) => {
  try {
    const astronaut = await getAstronautById(req.params.id);
    res.json({ success: true, payload: astronaut });
  } catch (error) {
    res.status(500).send("Error processing request")
  }
})

// Task 4

/* Write the request handler to perform the action and return the data from the function replaceAstronautById. Have this handler 
listen to requests at the appropriate path. */

app.put('/astronauts/:id', async (req, res) => {
  try {
    const astronaut = await replaceAstronautById(req.params.id, req.body.astronaut);
    res.json({ success: true, payload: astronaut });
  } catch (error) {
    res.status(500).send("Error processing request")
  }
})

// Task 5

/* Write the request handler to perform the action and return the data from the function deleteAstronautById. Have this handler 
listen to requests at the appropriate path. */

app.delete('/astronauts/:id', async (req, res) => {
  try {
    const astronaut = await deleteAstronautById(req.params.id);
    res.json({ success: true, payload: astronaut });
  } catch (error) {
    res.status(500).send("Error processing request")
  }
})

// Task 6

/* Write the request handler to perform the action and return the data from the function updateAstronautById. Have this handler 
listen to requests at the appropriate path. */

app.patch('/astronauts/:id', async (req, res) => {
  try {
    const astronaut = await updateAstronautById(req.params.id, req.body.astronaut);
    res.json({ success: true, payload: astronaut });
  } catch (error) {
    res.status(500).send("Error processing request")
  }
})

export default app;