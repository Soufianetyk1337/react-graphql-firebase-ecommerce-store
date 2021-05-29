const { auth } = require("../../firebase/utils");

export const handleResetPassword = (email) => {
  const config = {
    url: "http://localhost:3000/login", // Redirect page after submiting the reset form
  };
  return new Promise((resolve, reject) => {
    try {
      auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          console.log(`resolve`, resolve());
          resolve();
        })
        .catch(() => {
          reject([
            "There is no user record corresponding to this identifier. The user may have been deleted.",
          ]);
        });
    } catch (error) {
      console.error(error);
    }
  });
};
