const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect("mongodb+srv://greatstackdev:emc%4012@cluster0.ro1nhqm.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0");

// Cloudinary Configuration
cloudinary.config({
    cloud_name: 'drazqde9c',
    api_key: '878939456372848',
    api_secret: 'w2HpQ2SRCjRN0upNhggtoQcZgxQ'
});

// Cloudinary Storage Engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'upload/images',
        allowed_formats: ['jpg', 'png', 'jpeg']
    },
});
const upload = multer({ storage: storage });

// API Test
app.get("/", (req, res) => {
    res.send("Express App is Running")
});

// Image Upload Endpoint
app.post("/upload", upload.single("product"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }
  
    res.json({
      success: true,
      image_url: req.file.path, // <-- use `path` instead of `secure_url`
    });
  });
  

// Product Schema and Model
const Product = mongoose.model("Product", {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
});

app.post("/addproduct", async (req, res) => {
    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const product = new Product({
        id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        available: req.body.available
    });

    await product.save();
    res.json({ success: true, name: req.body.name });
});

app.post("/removeproduct", async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, name: req.body.name });
});

app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    res.send(products);
});

// User Schema and Model
const User = mongoose.model("User", {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Object },
    date: { type: Date, default: Date.now }
});

app.post("/signup", async (req, res) => {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "User already exists" });
    }

    // 🟢 Properly initialize as an empty object
    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: {} 
    });

    await user.save();

    const data = { user: { id: user.id } };
    const token = jwt.sign(data, "secret_ecom");
    res.json({ success: true, token });
});


   
app.post("/login", async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user && req.body.password === user.password) {
        const data = { user: { id: user.id } };
        const token = jwt.sign(data, "secret_ecom");
        res.json({ success: true, token });
    } else {
        res.json({ success: false, errors: "Invalid credentials" });
    }
});

app.get("/newcollections", async (req, res) => {
    let products = await Product.find({});
    let newCollection = products.slice(1).slice(-8);
    res.send(newCollection);
});

app.get("/popularinwomen", async (req, res) => {
    let product = await Product.find({ category: "women" });
    let popular_in_women = product.slice(0, 4);
    res.send(popular_in_women);
});

// Middleware for User Authentication
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send({ errors: "Please authenticate using a valid token" });
    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ errors: "Invalid token" });
    }
};

app.post('/addtocart', fetchUser, async (req, res) => {
    let userData = await User.findOne({ _id: req.user.id });

    // 🟢 Ensure cartData is always defined:
    if (!userData.cartData) {
        userData.cartData = {};
    }

    // 🟢 Ensure the product array is initialized:
    if (!userData.cartData[req.body.itemId]) {
        userData.cartData[req.body.itemId] = [];
    }

    // 🔍 Find the existing item by size:
    const existingItem = userData.cartData[req.body.itemId].find(
        (item) => item.size === req.body.size
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        userData.cartData[req.body.itemId].push({ size: req.body.size, quantity: 1 });
    }

    // 🟢 Finally, update the user data:
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData }, { new: true });
    res.json({ success: true, message: "Added to cart" });
});





app.post('/removefromcart', fetchUser, async (req, res) => {
    const { itemId, size } = req.body;
    let userData = await User.findOne({ _id: req.user.id });

    if (!userData.cartData || !userData.cartData[itemId]) {
        return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    const itemIndex = userData.cartData[itemId].findIndex(item => item.size === size);

    if (itemIndex === -1) {
        return res.status(404).json({ success: false, message: "Item size not found in cart" });
    }

    if (userData.cartData[itemId][itemIndex].quantity > 1) {
        userData.cartData[itemId][itemIndex].quantity -= 1;
    } else {
        userData.cartData[itemId].splice(itemIndex, 1);

        if (userData.cartData[itemId].length === 0) {
            delete userData.cartData[itemId];
        }
    }

    await User.findOneAndUpdate(
        { _id: req.user.id },
        { cartData: userData.cartData },
        { new: true }
    );

    res.json({ success: true, message: "Item removed from cart" });
});


app.get('/getcart', fetchUser, async (req, res) => {
    let userData = await User.findOne({ _id: req.user.id });
    res.json(userData.cartData);
});

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on port " + port);
    } else {
        console.log("Error: " + error);
    }
});
