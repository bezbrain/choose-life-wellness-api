const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please provide first name"],
      trim: true,
      minlength: [3, "Characters should not be less than 3"],
    },
    last_name: {
      type: String,
      required: [true, "Please provide last name"],
      trim: true,
      minlength: [3, "Characters should not be less than 3"],
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: [6, "Password should not be less than 6 character"],
    },
    confirm_password: {
      type: String,
      required: [true, "Please confirm password"],
      minlength: [6, "Password should not be less than 6 character"],
    },
  },
  { timestamps: true }
);

// Check if password and confirm_password are the same
UserSchema.path("confirm_password").validate(function (value) {
  return this.password === value;
}, "Passwords do not match");

// Hash Password
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Hash Confirm Password
UserSchema.pre("save", async function () {
  this.confirm_password = this.password;
});

// Sign password
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, first_name: this.first_name, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

// Compare Password
UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

module.exports = model("Users", UserSchema);
