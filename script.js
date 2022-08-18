function generatePassword() {

   // Put the allowed characters into a string, faster & easier than an array
   var numbers      = '0123456789';
   var lowercase    = 'abcdefghijkmnopqrstuvwxyz'; // No lower case l to avoid confusion
   var uppercase    = 'ABCDEFGHJKLMNOPQRSTUVWXYZ'; // No upper case i to avoid confusion
   var specialchars = '@#$%^';

   // Get chosen password length
   var pwlength = document.getElementById('password_length').value;

   // The yet empty password
   var password = '';

   // put all allowed groups into a string
   var allowedchars = '';

   // If numbers are allowed, add one number to the password
   if (document.getElementById('password_allow_numbers').checked == true) {

      password += numbers.charAt(Math.floor(Math.random() * numbers.length));

      // addd numbers to the string with allowed characters
      allowedchars += numbers;
   }

   // If lowercase letters are allowed, add one lowercase letter to the password
   if (document.getElementById('password_allow_lowercase_letters').checked == true) {

      password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));

      // addd lower case letters to the string with allowed characters
      allowedchars += lowercase;
   }

   // If uppercase letters are allowed, add one uppercase letter to the password
   if (document.getElementById('password_allow_uppercase_letters').checked == true) {

      password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));

      // addd upper case letters to the string with allowed characters
      allowedchars += uppercase;
   }

   // If special characters are allowed, add one special character to the password
   if (document.getElementById('password_allow_special_characters').checked == true) {

      password += specialchars.charAt(Math.floor(Math.random() * specialchars.length));

      // addd special characters to the string with allowed characters
      allowedchars += specialchars;
   }

   // Fill the password to length
   for (i=password.length; i<pwlength; i++) {

      password += allowedchars.charAt(Math.floor(Math.random() * allowedchars.length)); 
   }

   return password;
}

function colorPassword(element) {
   element.innerHTML = element.innerHTML.replace(/([a-z*?])/g, "<span class=\"char_lowercase\">$1</span>");
   element.innerHTML = element.innerHTML.replace(/([0-9*?])/g, "<span class=\"char_number\">$1</span>");
   element.innerHTML = element.innerHTML.replace(/([@#$%^*?])/g, "<span class=\"char_special\">$1</span>");
   element.innerHTML = element.innerHTML.replace(/([A-Z*?])/g, "<span class=\"char_uppercase\">$1</span>");
}

function suggestPasswords() {

   // Put the three passwords into an array for convenience
   ["suggested_password1", "suggested_password2", "suggested_password3"].forEach(function (element) {

      var element = document.getElementById(element);
      element.innerHTML = generatePassword();
      element.setAttribute('data-password', element.innerHTML);
      colorPassword(element);
   });

   document.getElementById('suggested_passwords').style.visibility = 'visible';
}

function copyPassword(element) {
   navigator.clipboard.writeText(document.getElementById(element).dataset.password).then(() => {
      document.getElementById('password_copied').style.visibility = 'visible';
      alert('Passwort kopiert');
      }, () => {
      /* clipboard write failed */
   });
}