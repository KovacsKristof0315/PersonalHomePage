//1 - papír, 2 - kő, 3 - olló

const items = ["paper", "rock", "scissors"];
const machineImg = document.getElementById("machineImg");

function rotate() {
	let index = 0;

	const intervalId = setInterval(() => {
	machineImg.src = `../assets/${items[index]}.png`;
	index = (index + 1) % items.length;
	}, 300);

	setTimeout(() => {
	clearInterval(intervalId);
	}, 3000);
}

function main(option)
{
	$("eredmeny").innerHTML = `${text[localStorage.getItem("actLang")].rps.titles[1]} `;
	let r = Math.floor(Math.random() * 3 + 1);

	$("machineImg").src = `../assets/${items[r-1]}.png`;
	
	
	let valasz = text[localStorage.getItem("actLang")].rps.result[option-1][r-1]
	
	$("eredmeny").innerHTML += valasz
}

function start(option) {
	$("eredmeny").innerHTML = `${text[localStorage.getItem("actLang")].rps.titles[1]} ??? `;
	$("youImg").src = `../assets/${items[option-1]}.png`;

	rotate();
	setTimeout(() => {
		main(option);
	}, 3500);
}


$("paper").addEventListener("click", (() => {
	start(1);
}))
$("rock").addEventListener("click", (() => {
	start(2)
}))
$("scissors").addEventListener("click", (() => {
	start(3);
}))