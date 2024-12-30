const validatePassword = function(password){
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_])[A-Za-z\d\W_*]{8,20}$/;
    if (passwordRegex.test(password))  return true 
    else throw new Error("Invalid Password. Must contain 8-20 characters, at least one uppercase letter, one lowercase letter, one number, and one special character.")
}

module.exports ={validatePassword}