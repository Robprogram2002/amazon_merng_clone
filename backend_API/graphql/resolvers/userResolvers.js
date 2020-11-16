const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

module.exports = {
  Query: {
    getUser: async (_, { id }) => {
      const user = await User.findById(id);
      return {
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        imageUrl: user.profile,
        userId: user._id,
        type: user.class,
      };
    },
  },
  Mutation: {
    register: async (_, { username, email, password, confirmPassword }) => {
      let errors = {};

      console.log("asnjdnjas dash das", username);

      try {
        // Validate input data
        if (email.trim() === "") errors.email = "email must not be empty";
        if (username.trim() === "")
          errors.username = "username must not be empty";
        if (password.trim() === "")
          errors.password = "password must not be empty";
        if (confirmPassword.trim() === "")
          errors.confirmPassword = "repeat password must not be empty";

        if (password !== confirmPassword)
          errors.confirmPassword = "passwords must match";

        if (Object.keys(errors).length > 0) {
          throw errors;
        }

        const hash_password = await bcrypt.hash(password, 12);

        const user = await User.create({
          username,
          email,
          password: hash_password,
        });

        return {
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          userId: user._id,
        };
      } catch (error) {
        throw error;
      }
    },
    login: async (_, { email, password, type }) => {
      let errors = {};
      console.log("andjknjn wqwewuiqh  ----------", type);

      try {
        if (email.trim() === "") errors.email = "email must not be empty";
        if (password.trim() === "")
          errors.password = "password must not be empty";

        if (Object.keys(errors).length > 0) {
          throw new UserInputError("bad input", { errors });
        }
        let user;
        if (type === "admin") {
          user = await User.findOne({ email: email, class: "admin" });
          console.log("andjknjn wqwewuiqh  ----------", type);
          console.log(user);
        } else if (type === "seller") {
          user = await User.findOne({ email: email, class: "seller" });
        } else {
          user = await User.findOne({ email });
        }

        if (!user) {
          errors.email = "user not found";
          throw new UserInputError(`user nor foud ${type}`, { errors });
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
          errors.password = "password is incorrect";
          throw new UserInputError("password is incorrect", { errors });
        }

        console.log(process.env.JWT_SECRET);

        const token = jwt.sign(
          {
            userId: user._id,
            time: new Date().toISOString(),
            username: user.username,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        return {
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          token,
          imageUrl: user.profile,
          userId: user._id,
          type: user.class,
        };
      } catch (error) {
        throw error;
      }
    },
  },
};
