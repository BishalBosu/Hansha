function logOut() {
	alert("todo")
}

async function sendMessage() {
	const message = document.getElementById("msg").value
	if (message != "") {
		const token = localStorage.getItem("token")
		try {
			await axios.post(
				`${BASE_URL}/message/send`,
				{ message: message },
				{
					headers: { Authorization: token },
				}
			)

            show_message(message);
            document.getElementById("msg").value = ""
                
		} catch (err) {
			console.log(err)
		}
	}
}

function show_message(message){
    document.getElementById("chats").innerHTML += `<tr><td>${localStorage.getItem('name')}</td><td>${message}</td></tr>`
}