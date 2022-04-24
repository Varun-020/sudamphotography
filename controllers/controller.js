const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const Gallery = require('../models/image');
const formidable = require("formidable");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const Image = require('../models/image');
const Offer = require('../models/offer');
const Booking = require('../models/booking');
const Contact = require("../models/contact");
const nodemailer = require('nodemailer');
require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

console.log("directory name", __dirname);
transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
    secure: true,
});

module.exports.registerValidations = [
    body("name").not().isEmpty().withMessage("name required"),
    body("email").isEmail().withMessage("email required"),
    body("password").isLength({ min: 8 }).withMessage("password must be 8 characters minimum "),
];

module.exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
        const checkUser = await User.findOne({ email });
        if (checkUser) return res.status(400).json({ errors: [{ msg: "Email is already taken" }] });
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        try {
            const user = await User.create({
                name, email, password: hash
            });
            const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '7d' });
            return res.status(200).json({ msg: "Registration Successful", token });
        } catch (error) {
            return res.status(500).json({ errors: error.message })
        }

    } catch (error) {
        return res.status(500).json({ errors: error })
    }
};

module.exports.loginValidations = [
    body("email").isEmail().withMessage("email required"),
    body("password").not().isEmpty().withMessage("password required"),
];
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
        const user = await User.findOne({ email });
        if (user) {
            const matched = await bcrypt.compare(password, user.password);
            if (matched) {
                const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '7d' });
                return res.json({ msg: "Login Successful", token });
            } else {
                return res.status(401).json({ errros: [{ msg: "Password is not correct" }] });
            }
        } else {
            return res.status(404).json({ errors: [{ msg: "User not found" }] });
        }
    } catch (error) {
        return res.status(500).json({ errors: error });
    }

};


module.exports.contact = async (req, res) => {
    const { name, email, contact, subject, message } = req.body;
    const mailData = {
        from: process.env.USER,  // sender address
        to: process.env.RECEIVER,   // list of receivers
        subject: subject,
        text: `Ref contact Sudam Photography`,
        html: ` <br/><b>Hey Sudam You have one visitor </b><br/>
        <br> Name:${name}<br/> 
        <br> Email:${email}<br/> 
        <br> Contact:${contact}<br/> 
        <br><b> Message:${message}</b><br/>`
    }
    const errors = [];
    if (!name || !email || !contact || !subject || !message) {
        errors.push({ msg: "Enter all fields" })
    }
    if (contact?.length != 10) {
        errors.push({ msg: "contact must be 10 digit" })
    }
    if (errors?.length > 0) {
        return res.status(400).json({ errors: errors });
    } else {
        try {
            const { response } = await Contact.create({
                name, email, contact, subject, message
            })
            transporter.sendMail(mailData, function (err, info) {
                if (err)
                    console.log(err)
            });
            return res.status(200).json({ msg: "Data submitted successfully", response });
        } catch (error) {

            return res.status(500).json({ errors: error.message });
        }
    }
};


module.exports.booking = async (req, res) => {
    const { name, email, contact, address, date } = req.body;
    const mailData = {
        from: process.env.USER,  // sender address
        to: process.env.RECEIVER,   // list of receivers
        subject: `BOOKING CALL`,
        text: `Ref BOOKING Sudam Photography`,
        html: ` <br/><b>Hey Sudam You have one BOOKING </b><br/>
        <br> Name:${name}<br/> 
        <br> Email:${email}<br/> 
        <br> Contact:${contact}<br/> 
        <br><b> Address:${address}</b><br/>
        <br><b> Date:${date}</b><br/>`
    }
    const errors = [];
    if (!name || !email || !contact || !address || !date) {
        errors.push({ msg: "Enter all fields" })
    }
    if (date) {
        if (Date.parse(date) - Date.parse(new Date()) < 0) {
            errors.push({ msg: "Selected date is in the past" });

        }
    }
    if (contact?.length != 10) {
        errors.push({ msg: "contact must be 10 digit" })
    }
    if (errors?.length > 0) {
        return res.status(400).json({ errors: errors });
    } else {
        try {
            const { response } = await Booking.create({
                name, email, contact, address, date
            })
            transporter.sendMail(mailData, function (err, info) {
                if (err)
                    console.log(err)
            });
            return res.status(200).json({ msg: "Data submitted successfully", response });
        } catch (error) {

            return res.status(500).json({ errors: error.message });
        }
    }
};



module.exports.uploadImage = (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (error, fields, files) => {
        const errors = [];
        if (Object.keys(files).length === 0) {
            errors.push({ msg: 'Select Image to continue' })
        }
        else {
            console.log("type of image", files.images.filepath);
            const type = files.images.mimetype;
            const split = type?.split('/');
            const extension = split[1].toLowerCase();
            console.log("extension", extension);

            if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
                errors.push({ msg: `${extension} is not a valid extension` });
            } else {
                files.images.originalFilename = uuidv4() + '.' + extension;
            }
        }

        if (errors.length !== 0) {
            console.log("errors is there");
            return res.status(400).json({ errors: errors });
        } else {

            const newPath = __dirname + `/../client/build/images/${files.images.originalFilename}`;
            fs.copyFile(files.images.filepath, newPath, async (error) => {
                if (!error) {
                    try {
                        const response = await Image.create({
                            image: files.images.originalFilename,
                        });
                        return res.status(200).json({ msg: 'Image uploaded successfully', response })
                    } catch (error) {
                        return res.status(500).json({ errors: error, msg: error.msg });

                    }
                }
            });
        }
    })
};

module.exports.uploadOffer = (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (error, fields, files) => {
        const errors = [];
        if (Object.keys(files).length === 0) {
            errors.push({ msg: 'Select Image to continue' })
        }
        else {
            const type = files.images.mimetype;
            const split = type.split('/');
            const extension = split[1].toLowerCase();
            if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
                errors.push({ msg: `${extension} is not a valid extension` });
            } else {
                files.images.originalFilename = uuidv4() + '.' + extension;

            }
        }
        if (errors.length != 0) {
            return res.status(400).json({ errors });
        } else {

            const newPath = __dirname + `/../client/build/images/offer/${files.images.originalFilename}`;
            fs.copyFile(files.images.filepath, newPath, async (error) => {
                if (!error) {
                    try {
                        const response = await Offer.create({
                            name: files.images.originalFilename,
                        });
                        return res.status(200).json({ msg: 'Offer uploaded successfully', response })
                    } catch (error) {
                        return res.status(500).json({ errors: error, msg: error.msg });

                    }
                }
            });
        }
    })
};

module.exports.offer = async (req, res) => {
    try {
        const offer = await Offer.find();
        return res.status(200).json({ msg: 'All Offer fetched', offer });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }

}

module.exports.deleteOffer = async (req, res) => {

    try {
        const query = { name: { $type: "string" } };
        const response = await Offer.deleteOne(query);
        return res.status(200).json({ msg: 'Your Offer has been deleted' });
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
    }
};

module.exports.gallery = async (req, res) => {
    try {
        const gallery = await Gallery.find();
        return res.status(200).json({ msg: 'All Images fetched', gallery });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }

}

module.exports.deleteImage = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await Gallery.findByIdAndRemove(id);
        return res.status(200).json({ msg: 'Your Image has been deleted' });
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
    }
};

module.exports.contactList = async (req, res) => {

    try {
        const contactList = await Contact.find();
        return res.status(200).json({ msg: 'Contacts fetched', contactList });
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
    }
};

module.exports.bookingList = async (req, res) => {

    try {
        const bookingList = await Booking.find();
        return res.status(200).json({ msg: 'Contacts fetched', bookingList });
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
    }
};