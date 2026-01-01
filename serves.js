import cors from "cors";
import mysql from "mysql";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "clinicdb",
});
app.get("/",(req,res)=>{
  res.send("clinic is running")});

app.get("/Appointments",(req,res)=>{
 
    const q = "SELECT * FROM appointments";
    
    db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json(data);
    }
  });
});
app.post("/addAppointments", (req, res) => {
  const { name, phone, email, date, diagnosis } = req.body;
  if (
    !req.body.name ||
    !req.body.phone ||
    !req.body.email ||
    !req.body.date ||
    !req.body.diagnosis
  ) {
    return res.status(400).send("All fields are required");
  }
  const q =
  
    "INSERT INTO appointments (name, phone, email, date, diagnosis ) VALUES (?, ? , ? ,? ,?)";
  
  db.query(q, [name, phone, email, date, diagnosis], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(201).json(data);
    }
  });
});


app.put("/appointments/:id", (req, res) => {
  const { id } = req.params;
  const { name, phone, email, date, diagnosis } = req.body;

  if (!name || !phone || !email || !date || !diagnosis) {
    return res.status(400).send("All fields are required");
  }

  const q =
    "UPDATE appointments  (name, phone, email, date, diagnosis ) VALUES (?, ? , ? ,? ,?)";;

  db.query(q, [name, phone, email, date, diagnosis, id], (err, result) => {
    if (err) return res.status(500).json(err);

    
    return res.status(200).json({ message: "Appointment updated " });
  });
});

   


app.delete("/appointments/:id", (req, res) => {
  const { id } = req.params;

  const q = "DELETE FROM appointments WHERE id=?";
  db.query(q, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res.status(200).json({ message: "Appointment deleted ✅" });
  });
});
app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
