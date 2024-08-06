import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port=3000;


// to be able to use static files
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended:true }));;
// Get request to connect to server 
app.get('/', async(req, res) => {
    res.render("index.ejs", { Amount1: 0 , Amount2: 0 , Amount3: 0});
});
// Post request to convert amount to decimal number and return result as a string
app.post('/convert', async(req, res) => {
    const input = req.body.egpFlag;
    try{
    const response = await axios.get("https://v6.exchangerate-api.com/v6/43ac38c8f1cb3e2157ff8c2a/latest/EGP");
    const usd= response.data.conversion_rates.USD;
    const eur= response.data.conversion_rates.EUR;
    const gbp= response.data.conversion_rates.GBP;
    const amount1= usd*input;
    const amount2= eur*input;
    const amount3= gbp*input;
    res.render("index.ejs", { Amount1: amount1 , Amount2:amount2 , Amount3: amount3});
    }catch(error){
        console.error(error);
        res.status(500).send("Error fetching exchange rates");
    }
});

// Start the server  on port 3000  and log the message in console.log()
app.listen(port, () => 
    console.log(`Server running on port ${port}`
    ));