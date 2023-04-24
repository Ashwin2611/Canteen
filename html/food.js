let cart = [];
let carts = []
let tempdata;
const fetchData = async () => {
  try {
    const response = await database.ref("carts").once("value");
    const data = response.val();
    return data;
  } catch (err) {
    console.log(err || "Something went wrong");
  }
};
setTimeout(async () => {
  tempdata = await fetchData();
  const data = carts.concat(tempdata);
  const userId = firebase.auth().currentUser.uid;
  if(data[0][userId])
  {
    console.log(data[0])
    console.log(data[0][userId]);
    manipulateCartNumber(data[0][userId]);
  }
  else{
    manipulateCartNumber([])
  }
}, 0);
// import { app } from "../firebase.config";
// const cartNo = document.getElementById("c");
let count = 0;
const manipulateCartNumber = (item) => {
  cart = item
  if(cart){
    var cartNo = document.getElementById("c");
    cartNo.textContent = cart.length;
  }
}
const addToCart =(item) => {
  count++;
  var found = false;
  let length = 0
  if(cart.length){
    length=cart.length;
  }
  for (var i = 0; i < length; i++) {
      if (cart[i].name === item.name) {
          cart[i].quantity++;
          found = true;
          break;
      }
  }
  if (!found) {
        cart.push({
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image,
        });
  }
    console.log(cart);

    // Get the current user ID
    const userId = firebase.auth().currentUser.uid;
    manipulateCartNumber(cart)
    // Store the cart data under the user's ID in the Firebase Realtime Database
    firebase.database().ref("carts/" + userId).set(cart);
};

function searchItems() {
  // Get the search term from the input field
  let searchTerm = document.getElementById("search-bar").value.toLowerCase();
  
  // Get all of the items on the page
  let items = document.getElementsByClassName("card");
  
  // Loop through the items and hide/show them based on the search term
  for (let i = 0; i < items.length; i++) {
    let itemTitle = items[i].querySelector(".card-title").textContent.toLowerCase();
    
    if (itemTitle.includes(searchTerm)) {
      items[i].style.display = "";
    } else {
      items[i].style.display = "none";
    }
  }
}

function toggleSearchBar() {
  const searchBar = document.getElementById('search-bar');
  searchBar.style.display = searchBar.style.display === 'none' ? 'block' : 'none';
}



// function removeFromCart(item) {
//   for (var i = 0; i < cart.length; i++) {
//     if (cart[i].name === item.name) {
//       if (cart[i].quantity > 1) {
//         cart[i].quantity--;
//       } else {
//         cart.splice(i, 1);
//       }
//       break;
//     }
//   }
//   updateCartDisplay();
// }

// function updateCartDisplay() {
//   var cartDisplay = document.getElementById("cart-display");
//   var totalDisplay = document.getElementById("total-display");
//   cartDisplay.innerHTML = "";
//   var total = 0;
//   for (var i = 0; i < cart.length; i++) {
//     var item = cart[i];
//     var itemCost = item.price * item.quantity;
//     total += itemCost;
//     var itemDisplay = document.createElement("div");
//     itemDisplay.innerHTML =
//       item.quantity + " x " + item.name + `: ₹` + itemCost.toFixed(2);
//     var itemImage = document.createElement("img");
//     itemImage.src = item.image;
//     itemDisplay.appendChild(itemImage);
//     var removeButton = document.createElement("button");
//     removeButton.innerHTML = "Remove";
//     removeButton.onclick = (function (item) {
//       return function () {
//         removeFromCart(item);
//       };
//     })(item);
//     itemDisplay.appendChild(itemImage);
//     itemDisplay.appendChild(removeButton);
//     cartDisplay.appendChild(itemDisplay);
//   }
//   totalDisplay.innerHTML = "Total: ₹" + total.toFixed(0);
// }

var item1 = {
  name: "Biriyani",
  price: 55,
  image: "../assets/biriyani.jpg",
};

var item2 = {
  name: "Fried Rice ",
  price: 50,
  image: "../assets/fried rice.jpeg",
};

var item3 = {
  name: "Noodles",
  price: 50,
  image: "../assets/noodles.jpg",
};

var item4 = {
  name: "Chilli chicken",
  price: 70,
  image: "../assets/chilli-chicken.jpg",
};
var item5 = {
    name: 'Pasta',
    price: 60,
    image: '../assets/pexels-photo-1438672.jpeg'
};
var item6 = {
  name: 'Meals',
  price: 45,
  image: '../assets/meals1.jpg'
};
var item7 = {
  name: 'Chicken Fried Rice',
  price: 60,
  image: '../assets/chicken-fried-rice.jpg'
};
var item8 = {
  name: 'Chicken Noodles',
  price: 60,
  image: '../assets/chicken noodles1.jpg'
};
var item9 = {
  name: 'Chicken Gravy',
  price: 70,
  image: '../assets/chicken-gravy.jpg'
};
var item10 = {
  name: 'Coconut Rice',
  price: 40,
  image: '../assets/Coconut Rice.jpg'
};


