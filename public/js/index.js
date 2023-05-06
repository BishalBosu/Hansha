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

			show_message(message)
			document.getElementById("msg").value = ""
		} catch (err) {
			console.log(err)
		}
	}
}

//when refreshed
window.addEventListener("DOMContentLoaded", async () => {
	try {
		const token = localStorage.getItem("token");
		const all_message_response = await axios.get(`${BASE_URL}/message/getall`, {
			headers: { Authorization: token },
		})

		showAllMessage(all_message_response.data)
	} catch (err) {
		console.log("error in dom loded", err)
	}
})

//utill functions
function showAllMessage(messages) {
	messages.forEach((element) => {
		show_message(element.message)
	})
}

function show_message(message) {
	document.getElementById("chats").innerHTML += `<tr><td>${localStorage.getItem(
		"name"
	)}</td><td>${message}</td></tr>`
}
