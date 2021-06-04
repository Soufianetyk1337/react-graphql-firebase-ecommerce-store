const { firestore } = require("../../firebase/utils");

export const handleSaveOrder = (order) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .doc()
      .set(order)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

export const handleGetUserOrderHisrory = (uid) => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection("orders").orderBy("oreder_created_at");
    ref = ref.where("orderUserId", "==", uid);
    ref
      .get()
      .then((snapshot) => {
        const data = [
          ...snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              documentId: doc.id,
            };
          }),
        ];
        resolve({ data });
      })
      .catch((error) => reject(error));
  });
};

export const handleGetOrderDetails = (orderId) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .doc(orderId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve({ ...snapshot.data(), documentId: orderId });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
