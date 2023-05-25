firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const paymentTable = document.getElementById("item-ordered");
      setInterval(() => {
        database.ref("payment").once("value")
          .then((snapshot) => {
            const paymentObjectData = snapshot.val();
            paymentTable.innerHTML = ""; // clear existing table rows
            for(const key in paymentObjectData){
              const paymentObjectDatakey = paymentObjectData[key]
              for(const k in paymentObjectDatakey){
                const paymentData = paymentObjectDatakey[k];
                if (paymentData) {
                  const paymentRow = paymentTable.insertRow();
                  const nameCell = paymentRow.insertCell(0);
                  const regnoCell = paymentRow.insertCell(1);
                  const itemCell = paymentRow.insertCell(2);
                  const amountCell = paymentRow.insertCell(3);
                  const phoneCell = paymentRow.insertCell(4);
                  const deliveredCell = paymentRow.insertCell(5);
                  const ActionCell=paymentRow.insertCell(6);
                  const markDeliveredButton = document.createElement("button");
                  markDeliveredButton.classList.add("markDeliveredButton");
                  markDeliveredButton.innerHTML = "Mark Delivered";
                  markDeliveredButton.addEventListener("click", () => {
                    const paymentRef = database.ref("payment/" + key + "/" + k);
                    paymentRef.update({ delivered: true })
                      .then(() => {
                        console.log("Payment updated successfully");
                      })
                      .catch((error) => {
                        console.error("Error updating payment: ", error);
                      });
                  });
                  nameCell.innerHTML = paymentData.name;
                  regnoCell.innerHTML = paymentData.regno;
                  let itemQuantities = '';
                  for (const cartItem of Object.values(paymentData.cart)) {
                    itemQuantities += cartItem.name + ' x ' + cartItem.quantity + ', ';
                  }
                  itemCell.innerHTML = itemQuantities.slice(0, -2); // remove the last comma
                  amountCell.innerHTML = "₹" + paymentData.amt;
                  phoneCell.innerHTML = paymentData.phone;
                  deliveredCell.innerHTML = paymentData.delivered ? "Yes" : "No";
                  if (!paymentData.delivered) {
                    ActionCell.appendChild(markDeliveredButton);
                    }
                    else {
                        const markNotDeliveredButton = document.createElement("button");
                        markNotDeliveredButton.classList.add("markNotDeliveredButton");
                        markNotDeliveredButton.innerHTML = "Unmark";
                        markNotDeliveredButton.addEventListener("click", () => {
                        const paymentRef = database.ref("payment/" + key + "/" + k);
                        paymentRef.update({ delivered: false })
                            .then(() => {
                            console.log("Payment updated successfully");
                            })
                            .catch((error) => {
                            console.error("Error updating payment: ", error);
                            });
                        });
                        ActionCell.appendChild(markNotDeliveredButton);
                      }
                }
              } 
            }
          })
        .catch((error) => {
          console.error("Error fetching payment data: ", error);
        });
      }, 1000); // Refresh every 1 seconds
    } else {
    console.log("User is not signed in");
    }
});

