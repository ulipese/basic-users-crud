const router = require("express").Router();
const { User } = require("../models/userSchema");

router
  .get("/", (req, res) => {
    res.status(200).redirect("/user");
  })
  .get("/adm", (req, res) => {
    const cookies = req.signedCookies;

    if (cookies.username && cookies.password && cookies.email) {
      res
        .status(200)
        .send(
          `Hello ${cookies.username}, your email is "${cookies.email}" and your password is "${cookies.password}"`
        );
    } else {
      res.render("adm", {
        titlePage: "Adm Page",
        bodyClass: "adm",
      });
    }
  })
  .post("/adm", (req, res) => {
    const admUser = req.body;

    User.findOne({ email: admUser.email }, (err, foundAdm) => {
      if (err) {
        console.log(err);
        res.status(500);
      }
      if (foundAdm) {
        res.status(200).render("errorMessage.ejs", {
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
        res.cookie("email", admUser.email, {
          signed: true,
          secure: true,
          httpOnly: true,
          path: "/adm",
        });
        res.cookie("password", admUser.password, {
          signed: true,
          secure: true,
          httpOnly: true,
          path: "/adm",
        });
        res.cookie("username", admUser.username, {
          signed: true,
          secure: true,
          httpOnly: true,
          path: "/adm",
        });

        res.status(201).redirect("/adm");
      }
    });
  })
  .get("/user", (req, res) => {
    res.status(200).render("user", {
      titlePage: "User Page",
      bodyClass: "home",
    });
  })
  .post("/user", (req, res) => {
    const user = req.body;
    User.findOne({ email: user.email }, (err, foundUser) => {
      if (err) {
        console.log(err);
        res.status(500);
      }
      if (foundUser) {
        res.status(200).render("errorMessage.ejs", {
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
        res.status(201).redirect("/users");
      }
    });
  })
  .get("/users", (req, res) => {
    User.find({}, (err, foundUsers) => {
      if (err) {
        console.log(err);
        res.status(500);
      }
      if (foundUsers == 0) {
        res.status(404).render("users", {
          titlePage: "Our users",
          bodyClass: "users",
          users: foundUsers,
          message: "You didn't create users, create here!",
          deleteButton: "No users to delete...",
          tag: "p",
          classes: "no-users",
        });
      }
      res.status(200).render("users", {
        titlePage: "Our users",
        bodyClass: "users",
        users: foundUsers,
        message: "Create new users here!",
        deleteButton: "Delete All Users",
        tag: "button",
        classes: "form__submit form__delete-all",
      });
    });
  })
  .post("/users", (req, res) => {
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
          res.status(500);
        }

        res.status(200).redirect("/users");
      }
    );
  })
  .get("/users/:userId", (req, res) => {
    User.find({ _id: req.params.userId }, (err, foundUser) => {
      if (err) {
        console.log(err);
        res.status(500);
      }
      res.status(200).render("editUser", {
        titlePage: "Edit User",
        bodyClass: "edit",
        users: foundUser,
      });
    });
  })
  .post("/users/delete", (req, res) => {
    const userId = req.body.userId;
    if (userId) {
      User.findByIdAndRemove({ _id: userId }, (err, userDeleted) => {
        if (err) {
          console.log(err);
          res.status(500);
        }
        res.status(200).redirect("/users");
      });
    }
    if (!userId) {
      User.deleteMany({}, (err, userDeleted) => {
        if (err) {
          console.log(err);
          res.status(500);
        }
        res.status(200).redirect("/users");
      });
    }
  });

module.exports = router;
