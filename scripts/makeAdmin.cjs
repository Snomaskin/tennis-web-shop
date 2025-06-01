const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

admin.auth().setCustomUserClaims("V90B2i16lKJUq3UbPZlc8ihD9Spi", { admin: true }).then(() => {
  console.log("Admin privileges granted");
});
