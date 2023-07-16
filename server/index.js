const express = require("express");
const cors = require("cors");
//const bodyParser = require('body-parser');
const app = express();

app.use(cors());

app.use(express.json());
//app.use(bodyParser.text());

const { getComplimentAll, getCompliment, addCompliment, updateCompliment, deleteCompliment,getFortune } = require('./controller')


app.get("/api/compliment/all", getComplimentAll);
app.get("/api/compliment", getCompliment);
app.post("/api/compliment", addCompliment);
app.put("/api/compliment", updateCompliment);
app.delete("/api/compliment", deleteCompliment);

app.get("/api/fortune", getFortune); 

app.listen(4000, () => console.log("Server running on 4000"));
