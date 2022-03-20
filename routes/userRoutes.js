const router = require("express").Router();
const { User } = require("../models/userSchema");
const cookieParser = require("cookie-parser");

router
  .get("/", (req, res) => {
    const cookies = req.cookies;
    res.send(
      "Hello " + cookies.name + " your password is " + cookies.pass
    );
    // if (req.cookies.user) {
    //   console.log("User logged: " + req.cookies.user);
    // } else {
    //   res.redirect("/adm");
    // }
  })
  .get("/adm", (req, res) => {
    res.render("adm", {
      titlePage: "Adm Page",
      bodyClass: "adm",
    });
  })
  .post("/adm", (req, res) => {
    const admUser = req.body;

    User.findOne({ email: admUser.email }, (err, foundAdm) => {
      if (err) {
        console.log(err);
      }
      if (foundAdm) {
        res.render("errorMessage.ejs", {
          titlePage: "Sorry...",
          bodyClass: "error",
          link: "/",
          message: "This user already exists... Create another here!",
        });
      }
      if (!foundAdm) {
        User.create({
          username: admUser.username,
          password: admUser.password,
          email: admUser.email,
        });
        console.log("Email:" + admUser.email);
        res.cookie("email", admUser.email, { secure: false });
        res.cookie("pass", admUser.password);
        res.cookie("name", admUser.username);

        res.redirect("/");
      }
    });
  })
  .get("/user", (req, res) => {
    res.render("user", {
      titlePage: "User Page",
      bodyClass: "home",
    });
  })
  .post("/user", (req, res) => {
    const user = req.body;
    User.findOne({ email: user.email }, (err, foundUser) => {
      if (err) {
        console.log(err);
      }
      if (foundUser) {
        res.render("errorMessage.ejs", {
          titlePage: "Sorry...",
          bodyClass: "error",
          link: "/",
          message: "This user already exists... Create another here!",
        });
      }
      if (!foundUser) {
        User.create({
          username: user.username,
          password: user.password,
          email: user.email,
        });
        res.redirect("/users");
      }
    });
  })
  .get("/users", (req, res) => {
    User.find({}, (err, foundUsers) => {
      if (err) {
        console.log(err);
      }
      if (foundUsers == 0) {
        res.render("users", {
          titlePage: "Our users",
          bodyClass: "users",
          users: foundUsers,
          message: "You didn't create users, create here!",
        });
      }
      res.render("users", {
        titlePage: "Our users",
        bodyClass: "users",
        users: foundUsers,
        message: "Create new users here!",
      });
    });
  })
  .post("/delete", (req, res) => {
    const userId = req.body.userId;
    User.findByIdAndRemove({ _id: userId }, (err, userDeleted) => {
      if (err) {
        console.log(err);
      }
      console.log(userDeleted);
    });
    res.redirect("/users");
  })
  .get("/changeUser:userId", (req, res) => {
    User.find({ _id: req.params.userId }, (err, foundUser) => {
      if (err) {
        console.log(err);
      }
      res.render("editUser", {
        titlePage: "Edit User",
        bodyClass: "edit",
        users: foundUser,
      });
    });
  })
  .post("/changeUser", (req, res) => {
    const user = req.body;
    User.findByIdAndUpdate(
      { _id: user.userId },
      {
        $set: {
          username: user.userName,
          password: user.userPass,
          email: user.userEmail,
        },
      },
      (err, userUpdated) => {
        if (err) {
          console.log(err);
        }
        console.log(userUpdated);
      }
    );
    res.redirect("/users");
  });

module.exports = router;
