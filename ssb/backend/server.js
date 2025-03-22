const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-account', (req, res) => {
  res.status(201).json({ message: 'Account created successfully!' });
  console.log(req.body);
  })

app.listen(4000, () => console.log('Server running on port 4000')); 
//mongodb+srv://Cluster90319:TVtnd2B2dB5m@cluster90319.h1fut.mongodb.net/