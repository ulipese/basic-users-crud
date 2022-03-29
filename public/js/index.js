const formUser =
  document.querySelector("form.create-user") ||
  document.querySelector("form.edit-user");

const usernameInput = document.querySelector(
  "input.form__input-username"
);
const passwordInput = document.querySelector(
  "input.form__input-password"
);
const emailInput = document.querySelector("input.form__input-email");

const allInputs = document.querySelectorAll("input.input");

allInputs[0].focus();

allInputs.forEach((ipt, idx) => {
  ipt.addEventListener("keyup", (event) => {
    if (event.keyCode === 13 && ipt.value !== "" && idx !== 2) {
      console.log(idx);
      allInputs[idx + 1].focus();
    }
    if (event.keyCode === 13 && ipt.value !== "" && idx === 2) {
      toSubmit();
    }
  });
});

const toSubmit = () => {
  if (
    usernameInput.value == "" ||
    usernameInput.value.length == 0 ||
    !usernameInput.value
  ) {
    alert("Give a username to the user!");
    usernameInput.focus();
    return;
  } else if (
    passwordInput.value == "" ||
    passwordInput.value.length == 0 ||
    !passwordInput.value ||
    passwordInput.value.length >= 17 ||
    passwordInput.value.length < 8
  ) {
    alert(
      "The password must be less than 17 and equal or greater than 8!"
    );
    passwordInput.focus();
    return;
  } else if (
    !emailInput ||
    emailInput.value == null ||
    emailInput.value == undefined ||
    emailInput.value.length >= 61 ||
    emailInput.value.length < 10 ||
    !emailInput.value.includes("@") ||
    (!emailInput.value.endsWith(".com") &&
      !emailInput.value.endsWith(".net") &&
      !emailInput.value.endsWith(".gov") &&
      !emailInput.value.endsWith(".br") &&
      !emailInput.value.endsWith(".co") &&
      !emailInput.value.endsWith(".org"))
  ) {
    alert("Put a correct email!");
    emailInput.focus();
    return;
  } else {
    if (formUser.classList.contains("edit-user")) {
      const wantCreateUser = confirm(
        "Do you want to change the user?"
      );
      wantCreateUser === true
        ? formUser.submit()
        : alert("Ok, check the user data and change the user later!");
    }
    if (formUser.classList.contains("create-user")) {
      const wantCreateUser = confirm(
        "Do you want to create the user?"
      );
      if (wantCreateUser === true) {
        formUser.submit();
      }
      if (wantCreateUser === false) {
        alert("Ok, check the user data and create one user later!");
        usernameInput.focus();
      }
    }
  }
};
