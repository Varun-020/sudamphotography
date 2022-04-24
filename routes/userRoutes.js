const express = require("express");
const { registerValidations, register, loginValidations, login, contact, booking, uploadImage,
    uploadOffer, gallery, offer, deleteImage, deleteOffer, contactList, bookingList
} = require("../controllers/controller");
const auth = require("../config/auth")
const router = express.Router();

router.post("/signup", registerValidations, register);
router.post("/login", loginValidations, login);
router.post("/contactUs", contact);
router.post("/bookings", booking);
router.post("/uploadImage", auth, uploadImage);
router.post("/setOffer", auth, uploadOffer);
router.get("/gallery", gallery);
router.get("/fetchOffer", offer);
router.get("/contactlist", contactList);
router.get("/bookinglist", bookingList);
router.get("/delete", auth, deleteOffer);
router.get("/deleteimage/:id", auth, deleteImage);

module.exports = router;