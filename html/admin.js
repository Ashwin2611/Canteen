firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // const userId = user.uid;
        const paymentTable = document.getElementById("item-ordered");
        setInterval(() => {
            database.ref("payment").once("value")
                .then((snapshot) => {
                    const paymentObjectData = snapshot.val();
                    paymentTable.innerHTML = ""; // clear existing table rows
                    for(const key in paymentObjectData){
                        const paymentObjectDatakey = paymentObjectData[key]
                        for(const k in paymentObjectDatakey){
                            const paymentData = paymentObjectDatakey[k]
                            if (paymentData) {
                                const paymentRow = paymentTable.insertRow();
                                const nameCell = paymentRow.insertCell(0);
                                const regnoCell = paymentRow.insertCell(1);
                                const itemCell = paymentRow.insertCell(2);
                                const amountCell = paymentRow.insertCell(3);
                                const phoneCell = paymentRow.insertCell(4);
                                nameCell.innerHTML = paymentData.name;
                                regnoCell.innerHTML = paymentData.regno;
                                let itemQuantities = '';
                                for (const cartItem of Object.values(paymentData.cart)) {
                                    itemQuantities += cartItem.name + ' x ' + cartItem.quantity + ', ';
                                }
                                itemCell.innerHTML = itemQuantities.slice(0, -2); // remove the last comma
                                amountCell.innerHTML = "₹" + paymentData.amt;
                                phoneCell.innerHTML = paymentData.phone;
                            }
                        }
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }, 2000); // refresh every 5 seconds (5000 milliseconds)
    }
});
