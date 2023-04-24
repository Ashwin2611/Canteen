let cart = [];
let carts=[]
let tempdata;
// const firebaseConfig = {
//   // Your Firebase configuration here
// };
// firebase.initializeApp(firebaseConfig);
// const database = firebase.database();

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
  console.log(data[0][userId]);
  updateCartDisplay(data[0][userId])
}, 0);
let count = 0;


const addtoCart =(item) => {
    count++;
    var found = false;
    for (var i = 0; i < cart.length; i++) {
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
  
      // Store the cart data under the user's ID in the Firebase Realtime Database
      firebase.database().ref("carts/" + userId).set(cart);
      updateCartDisplay(cart)
  };
  
function removeFromCart(item) {
    // find item in cart
    
    for (var i = 0; i < cart.length; i++) {
        console.log(cart[i].name,item.name)
        if (cart[i].name === item.name) {
            // if item quantity > 1, decrement quantity
            if (cart[i].quantity > 1) {
                cart[i].quantity--;
            } else {
                // otherwise, remove item from cart
                cart.splice(i, 1);
            }
            break;
        }
        else{
            console.log("no")
        }
    }
    console.log(cart)
    // update cart display
    updateCartDisplay(cart);
    const userId = firebase.auth().currentUser.uid;
  
    // Store the cart data under the user's ID in the Firebase Realtime Database
    firebase.database().ref("carts/" + userId).set(cart);
}

function updateCartDisplay(data) {
    cart = data
    var cartDisplay = document.getElementById('cart-display');
    var totalDisplay = document.getElementById('total-display');
    // clear previous cart display
    cartDisplay.innerHTML = '';
    // calculate total cost and display it
    var total = 0;
  
    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var itemCost = item.price * item.quantity;
        total += itemCost;
        
        // create HTML for item display
        var itemDisplay = document.createElement('div');
        itemDisplay.innerHTML = item.quantity + ' x ' + item.name + `: ₹` + itemCost.toFixed(2);
        // create image element and set its src attribute
        var itemImage = document.createElement('img');
        itemImage.src = item.image;
        itemDisplay.appendChild(itemImage);
        // create button to remove
	  var removeButton = document.createElement('button');
        removeButton.innerHTML = 'Remove';
        removeButton.onclick = (function (item) {
            return function () {
                removeFromCart(item);
            };
        })(item);
        // console.log(total)

        // add item display, image and remove button to cart display
        itemDisplay.appendChild(itemImage);
        itemDisplay.appendChild(removeButton);
        cartDisplay.appendChild(itemDisplay);
    }
    totalDisplay.innerHTML = 'Total: ₹' + total.toFixed(0);
    // console.log(totalDisplay)
    console.log(total)
    // console.log()
    localStorage.setItem('totalamount',total)
  // localStorage.get
}
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
  
  
  
  
  
0