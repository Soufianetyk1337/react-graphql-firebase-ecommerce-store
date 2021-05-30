import { firestore } from "../../firebase/utils";

export const handleAddProduct = (product) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc()
      .set(product)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

export const handleFetchProducts = ({ filterType }) => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection("products").orderBy("created_at");
    if (filterType) ref = ref.where("productCategory", "==", filterType);
    ref
      .get()
      .then((snapshot) => {
        const products = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            documentId: doc.id,
          };
        });
        resolve(products);
      })
      .catch((error) => reject(error));
  });
};

export const handleProductDelete = (documentID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(documentID)
      .delete()
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};
