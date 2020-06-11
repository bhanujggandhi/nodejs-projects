// =============Object property shorthand===============

const name = "Bhanuj";
const userAge = 19;

const user = {
  name,
  age: userAge,
  location: "Panipat",
};

console.log(user);

// ==============Object destructuring=============

const product = {
  label: "Red Notebook",
  price: 3,
  stock: 201,
  salePrice: undefined,
};

// const label = product.label;
// const stock = product.stock;

const { label: productLabel, stock, rating = 5 } = product;
console.log(productLabel);
console.log(stock);
console.log(rating);

const transaction = (type, { label, stock }) => {
  console.log(type, label, stock);
};

transaction("order", product);
