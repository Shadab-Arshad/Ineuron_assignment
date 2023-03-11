const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Product schema
const productSchema = new mongoose.Schema({
  pname: String,
  price: Number,
  brand : String,
  email : String
});

// Creating Product model
const product = mongoose.model('product', productSchema);


const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/Ineuron'
)
  .then(() => console.log('Connected to Database'))
  .catch(error => console.error(error));

// Define CRUD routes

// Get all Product_items 
app.get('/items', async (req, res) => {
  try {
    const items = await product.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get an Product_items  by email
app.get('/items/:email', async (req, res) => {
  const email = req.params.email;
  try {
    const item = await product.findOne({ email });
    if (!item) {
      res.status(404).json({ message: 'Email Not Found...' });
    } else {
      res.json(item);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new Product_item
app.post('/items', async (req, res) => {
  const newItem = new product(req.body);
  const email = req.body.email;
  try {
    const user =  await product.findOne({email }).exec();
        if (user) {
          // Email exist 
          return res.status(404).json({ error: 'Email Already Exist...' });
        } 
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an Product_items by email
app.put('/items/:email', async (req, res) => {
    try 
    {
        const email = req.params.email
        const updatedproduct =  await product.findOne({ email }).exec();
        if (!updatedproduct) {
          // Email non-exist 
          res.status(404).json({ error: 'Email not found' });
        } else {
            // Update product fields with new data
            updatedproduct.pname = req.body.pname || updatedproduct.pname;
            updatedproduct.email = req.body.email || updatedproduct.email;
            updatedproduct.brand  = req.body.brand || updatedproduct.brand
            updatedproduct.price =  req.body.price || updatedproduct.price 
            const newproduct = await updatedproduct.save();
            res.json(newproduct);
          }
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
});

// Delete Product_items by email
app.delete('/items/:email', async (req, res) => {
    const email = req.params.email
    try {
        const emailExist =  await product.findOne({ email }).exec();
        if (!emailExist) {
          // Email non-exist 
          return res.status(404).json({ error: 'Email not found' });
        }
        const item = await product.deleteOne({email})
        res.json(item);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
