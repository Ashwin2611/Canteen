const total = document.getElementById("total-amount")
const amt = localStorage.getItem('totalamount')
console.log(total)
console.log(amt)
total.innerText = `Total amount:₹${amt}`
console.log(total)
// const database = firebase.database();
let cart = [];

// Fetch cart data for the current user
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const userId = user.uid;
    database.ref("carts/" + userId).once("value")
    .then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        cart = data;
      }
    })
    .catch((error) => {
      console.error(error);
      });
  }
});

// Store cart data in another table
function storeCartData() {
  let date = new Date().valueOf();
  let name = document.getElementById("name").value;
  let regno = document.getElementById("regno").value;
  let phone = document.getElementById("phone").value;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const userId = user.uid;
      const data = {
        name: name,
        regno: regno,
        amt: amt,
        phone: phone,
        cart: cart
      };
      // let x = document.forms["Myform"]["payment"].value;
      // if (x == "") {
      //   alert("Name must be filled out");
      //   return false;
      // }
      database.ref("payment/" + userId + '/' +date ).set(data)
      .then(() => {
        alert("Your Order is Placed");
        console.log("Cart data stored successfully");
      })
      .catch((error) => {
        console.error(error);
      });
    }
  });
}
