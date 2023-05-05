async function logIn() {
	const emailInput = document.getElementById("email")
	const passInput = document.getElementById("pass")
	const checkInput = document.getElementById("check")

	let isValid = true

	if (!emailInput.checkValidity()) {
		isValid = false
	}
	if (!passInput.checkValidity()) {
		isValid = false
	}
	if (!checkInput.checkValidity()) {
		isValid = false
	}

	if (isValid) {
        const email = emailInput.value;
        const pass = passInput.value;

        obj = {
            email,
            pass
        }

        try{
            await axios.post(`${BASE_URL}/login`, obj)
        }catch(err){
            console.log("login.js error", err);
        }



	}
    else{
        alert("Please fill all the fields!")
    }

}
