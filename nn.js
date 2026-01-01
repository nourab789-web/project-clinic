
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "clinicdb",
});

const appointments=[];
app.get("/get",(req,res)=>{
    const q = "SELECT * FROM Appointment";
    res.send("clinic is running");
    db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json(data);
    }
  });
});



app.post("/addappointment",(req,res)=>{
    const ne=req.body;
    appointments.push(newAppointment);
    //201 create
    res.status(201).json({message:"appointment save",data:newAppointment});

})