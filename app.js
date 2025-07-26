const express = require ("express");
const app = express();
const conn = require("./conn/conn");
const cors = require ("cors")
app.use(cors())
conn();
const auth = require("./routes/auth");
const list = require("./routes/list");
app.get("/favicon.ico", (req, res) => res.status(204));
app.use(express.json());
app.get("/",(req,res) => {
    res.send("Hello");
});
app.use("/api/v1",auth)
app.use("/api/v2",list)

app.listen(1000,()=>{
    console.log("server started");
});

