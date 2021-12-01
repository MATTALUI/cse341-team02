let confirmPassword = document.getElementById("confirmPassword");
let password = document.getElementById("password");
let passwordInstructions = document.getElementById("passwordInstructions");
console.log(passwordInstructions);

confirmPassword.addEventListener("input", function () {
  if (password.value === confirmPassword.value) {
    confirmPassword.style.borderColor = "rgb(0, 255, 0)";
    passwordInstructions.classList.add("hidden");
  } else {
    confirmPassword.style.borderColor = "red";
    passwordInstructions.classList.remove("hidden");
    passwordInstructions.innerHTML= "<p class='form-text'>Passwords don't match</p>";
  }
});

