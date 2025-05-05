const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
// const { log } = require('console');

const app = express();
app.use(cors());
const PORT = 3000;

const wishlistFile = "./wishlist.json";
const shoesData = require("./shoes.json");
const { log } = require("console");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const accountsFilePath = "./accounts.json";

app.post("/register", (req, res) => {
  console.log(req.body);

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("All fields are required.");
  }

  fs.readFile(accountsFilePath, (err, data) => {
    if (err) {
      console.error("Error reading accounts file:", err);
      return res.status(500).send("Internal server error.");
    }

    const accounts = JSON.parse(data);

    const userExists = accounts.some((account) => account.email === email);

    if (userExists) {
      return res.status(409).send("Email is already registered.");
    }

    accounts.push({ username, email, password });

    fs.writeFile(accountsFilePath, JSON.stringify(accounts, null, 2), (err) => {
      if (err) {
        console.error("Error writing to accounts file:", err);
        return res.status(500).send("Internal server error.");
      }

      console.log("User registered successfully:", { username, email });
      res.status(201).send("User registered successfully.");
    });
  });
});

function findElementIndex(jsonData, searchKey, searchValue) {
  return jsonData.shoes.findIndex((shoe) => shoe[searchKey] === searchValue);
}

app.post("/add-to-wishlist", (req, res) => {
  const { email, model } = req.body;
  if (!email || !model) {
    return res.status(400).json({ message: "Email and model are required." });
  }

  const shoeIndex = findElementIndex(shoesData, "model", model);

  if (shoeIndex === -1) {
    return res.status(404).json({ message: "Shoe not found." });
  }

  let wishlist = {};

  if (fs.existsSync(wishlistFile)) {
    const rawData = fs.readFileSync(wishlistFile);
    wishlist = JSON.parse(rawData);
  } else console.log("not able to read");

  if (!wishlist[email]) {
    wishlist[email] = [];
  } else console.log("not able to find and do ");

  if (!wishlist[email].includes(shoeIndex)) {
    wishlist[email].push(shoeIndex);
  } else console.log("withlist added not ");

  fs.writeFileSync(wishlistFile, JSON.stringify(wishlist, null, 2));
  res.json({
    message: `Wishlist updated for ${email}`,
    wishlist: wishlist[email],
  });
});

app.get("/wishlist/:email", (req, res) => {
  const email = req.params.email;

  if (!fs.existsSync(wishlistFile)) {
    console.log(res.status(404).json({ message: "No wishlist found." }));

    return res.status(404).json({ message: "No wishlist found." });
  }

  const wishlist = JSON.parse(fs.readFileSync(wishlistFile));

  if (!wishlist[email]) {
    console.log(
      res.status(404).json({ message: "No wishlist found for this email." })
    );

    return res
      .status(404)
      .json({ message: "No wishlist found for this email." });
  }
  const array_wish = wishlist[email];
  const res_json = {};
  array_wish.forEach((element) => {
    res_json[element] = shoesData.shoes[element];
  });
  console.log(res_json);
  res.json(res_json);

  // res.json({ wishlist: wishlist[email] });
});

const cartFile = "./cart.json";

app.post("/add-to-cart", (req, res) => {
  const { email, model } = req.body;
  if (!email || !model) {
    return res.status(400).json({ message: "Email and model are required." });
  }

  const shoeIndex = findElementIndex(shoesData, "model", model);
  if (shoeIndex === -1) {
    return res.status(404).json({ message: "Shoe not found." });
  }

  let cart = {};

  if (fs.existsSync(cartFile)) {
    const rawData = fs.readFileSync(cartFile);
    cart = JSON.parse(rawData);
  }

  if (!cart[email]) {
    cart[email] = [];
  }

  if (!cart[email].includes(shoeIndex)) {
    cart[email].push(shoeIndex);
  }

  fs.writeFileSync(cartFile, JSON.stringify(cart, null, 2));
  res.json({ message: `Cart updated for ${email}`, cart: cart[email] });
});

app.get("/cart/:email", (req, res) => {
  const email = req.params.email;

  if (!fs.existsSync(cartFile)) {
    console.log("asd");
    return res.status(404).json({ message: "No cart found." });
  }

  const cart = JSON.parse(fs.readFileSync(cartFile));

  if (!cart[email]) {
    return res.status(404).json({ message: "No cart found for this email." });
  }

  const cartItems = cart[email].map((index) => shoesData.shoes[index]);
  const totalBill = cartItems.reduce((sum, item) => sum + item.price, 0);
  // const totalBill=[];
  // cartItems.forEach((ele) => {totalBill.push(ele)});

  // console.log ({ cartItems, totalBill });
  res.json({ cartItems, totalBill });
});

app.delete("/clear-cart/:email", (req, res) => {
  const email = req.params.email;
  console.log("asd");
  if (!fs.existsSync(cartFile)) {
    return res.status(404).json({ message: "No cart found." });
  }

  let cart = JSON.parse(fs.readFileSync(cartFile));

  if (!cart[email]) {
    return res.status(404).json({ message: "No cart found for this email." });
  }

  delete cart[email];

  fs.writeFileSync(cartFile, JSON.stringify(cart, null, 2));

  console.log(`Cart for ${email} deleted`);
  res.json({ message: "Cart cleared successfully." });
});

const readWishlist = () => {
  try {
    const data = fs.readFileSync(wishlistFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading wishlist:", error);
    return {};
  }
};

const writeWishlist = (data) => {
  try {
    fs.writeFileSync(wishlistFile, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing wishlist:", error);
  }
};

app.delete("/remove-from-wishlist", (req, res) => {
  const { email, model } = req.body;

  if (!email || !model) {
    return res
      .status(400)
      .json({ success: false, message: "Email and model are required." });
  }

  let wishlist = readWishlist();

  if (!wishlist[email]) {
    return res
      .status(404)
      .json({ success: false, message: "No wishlist found for this email." });
  }

  const shoeIndex = shoesData.shoes.findIndex((shoe) => shoe.model === model);

  if (shoeIndex === -1 || !wishlist[email].includes(shoeIndex)) {
    return res
      .status(404)
      .json({ success: false, message: "Item not found in wishlist." });
  }

  wishlist[email] = wishlist[email].filter((index) => index !== shoeIndex);

  writeWishlist(wishlist);

  res.json({ success: true, message: `${model} removed from wishlist.` });
});

const readCart = () => {
  try {
    const data = fs.readFileSync(cartFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading cart:", error);
    return {};
  }
};

const writeCart = (data) => {
  try {
    fs.writeFileSync(cartFile, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing cart:", error);
  }
};

app.delete("/remove-from-cart", (req, res) => {
  const { email, model } = req.body;

  if (!email || !model) {
    return res
      .status(400)
      .json({ success: false, message: "Email and model are required." });
  }

  let cart = readCart();

  if (!cart[email]) {
    return res.status(404).json({
      success: false,
      message: "No items in add to cart found for this email.",
    });
  }

  const shoeIndex = shoesData.shoes.findIndex((shoe) => shoe.model === model);

  if (shoeIndex === -1 || !cart[email].includes(shoeIndex)) {
    return res
      .status(404)
      .json({ success: false, message: "Item not found in Cart." });
  }

  cart[email] = cart[email].filter((index) => index !== shoeIndex);

  writeCart(cart);

  res.json({ success: true, message: `${model} removed from Add to Cart.` });
});

app.post("/add-review", (req, res) => {
  const { email, review } = req.body;

  if (!email || !review) {
    return res.status(400).json({ message: "Email and review are required." });
  }

  let reviews = {};

  if (fs.existsSync("reviews.json")) {
    const rawData = fs.readFileSync("reviews.json");
    reviews = JSON.parse(rawData);
  }

  if (!reviews[email]) {
    reviews[email] = [];
  }
  const sentimentAnalysis = autocorrect(review);
  console.log(sentimentAnalysis);
  reviews[email].push({
    review,
    timestamp: new Date().toISOString(),
    sentimentAnalysis,
  });


  fs.writeFileSync("reviews.json", JSON.stringify(reviews, null, 2));

  res.json({ message: `Review added for ${email}`, reviews: reviews[email] });
});

app.get("/reviews/:email", (req, res) => {
  const { email } = req.params;

  // Read the live reviews.json file
  fs.readFile("reviews.json", "utf8", (err, rawData) => {
    if (err) {
      return res.status(500).json({ message: "Error loading reviews." });
    }

    let reviews = JSON.parse(rawData);

    // Check if the user has reviews
    if (!reviews[email]) {
      return res
        .status(404)
        .json({ message: "No reviews found for this email." });
    }

    res.json({ email, reviews: reviews[email] });
  });
});

function autocorrect(paragraph) {
  const Sentiment = require("sentiment");
  const sentiment = new Sentiment();
  const Typo = require("typo-js");

  const fs = require("fs");

  // Load dictionaries
  const affData = fs.readFileSync("en_US.aff", "utf-8");
  const dicData = fs.readFileSync("en_US.dic", "utf-8");
  const typo = new Typo("en_US", affData, dicData);

  //   const paragraph = "This is a smple paragraf with som erors.I am very happy but at tge smae time i am sad.loving the scene";
  const words = paragraph.split(/(\s+)/); // keeps spaces
  let corrected = "";

  words.forEach((word) => {
    const cleanWord = word.replace(/[^a-zA-Z]/g, "");
    const punct = word.replace(/[a-zA-Z]/g, "");

    if (cleanWord && !typo.check(cleanWord)) {
      const suggestions = typo.suggest(cleanWord);

      const bestGuess = suggestions[0] || cleanWord;
      corrected += bestGuess + punct;
    } else {
      corrected += word;
    }
  });

  console.log("Corrected:", corrected);
  const result = sentiment.analyze(corrected);
  return result;
}

// console.log(autocorrect("we had a wonderful experience"));
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
