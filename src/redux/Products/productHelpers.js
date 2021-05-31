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

export const handleFetchProducts = ({
  filterType,
  offset,
  previousProducts = [],
}) => {
  return new Promise((resolve, reject) => {
    const perPage = 2;
    let ref = firestore
      .collection("products")
      .orderBy("created_at")
      .limit(perPage);
    if (filterType) ref = ref.where("productCategory", "==", filterType);
    if (offset) ref = ref.startAfter(offset);
    ref
      .get()
      .then((snapshot) => {
        const total = snapshot.size;
        const data = [
          ...previousProducts,
          ...snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              documentId: doc.id,
            };
          }),
        ];
        resolve({
          data,
          queryDoc: snapshot.docs[total - 1],
          isLastPage: total < 1,
        });
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

export const handleFetchProduct = (productId) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(productId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) resolve(snapshot.data());
      })
      .catch((error) => reject(error));
  });
};
