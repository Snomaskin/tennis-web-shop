const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

admin.auth().setCustomUserClaims("USER_UID", { admin: true }).then(() => {
  console.log("Admin privileges granted");
});
