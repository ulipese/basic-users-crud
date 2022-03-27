const validateUser = (user) => {
  if (
    !user.username ||
    user.username == null ||
    user.username == undefined ||
    user.username.length > 16
  ) {
    console.log("The username is wrong, the user don't was created.");
    return 400;
  } else if (
    !user.password ||
    user.password == null ||
    user.password == undefined ||
    user.password.length > 16 ||
    user.password.length < 8 ||
    isNaN(Number(user.password))
  ) {
    console.log("The password is wrong, the user don't was created.");
    return 400;
  } else if (
    !user.email ||
    user.email == null ||
    user.email == undefined ||
    user.email.length >= 61 ||
    user.email.length < 10 ||
    !user.email.includes("@") ||
    (!user.email.endsWith(".com") &&
      !user.email.endsWith(".net") &&
      !user.email.endsWith(".gov") &&
      !user.email.endsWith(".br") &&
      !user.email.endsWith(".co") &&
      !user.email.endsWith(".org"))
  ) {
    console.log("The email is wrong, the user don't was created.");
    return 400;
  } else {
    console.log("The user data is correct, the user was created");
    return 200;
  }
};

module.exports = validateUser;
