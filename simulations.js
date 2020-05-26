function simulate(money) {
	document.getElementById("startButton").disabled = true;
	
	let closure = function() {
		let counter = money;

		return function() {
			counter--;
			console.log(counter)
			return counter;
		}
	}();

	let getWinningNumbers = function(closure) {
			if(closure() == 0) {
				clearInterval(t);
				document.getElementById("startButton").disabled = false;
			}
			
			let numbers = generateNumbers();
			for(let i=0; i<numbers.length; i++) {
				let key = "win" + i;
				document.getElementById(key).innerHTML = "<p>" + numbers[i] + "</p>";
			}
	}

	let t = setInterval(getWinningNumbers, 200, closure);
}

function generateNumbers() {
	let picks = [];
	let set = new Set();

	for (var i=0; i<5; i++) {
		let randomNumber = getRandomNumber(1, 69);

		while(set.has(randomNumber)) {
			randomNumber = getRandomNumber(1, 69);
		}

		picks.push( randomNumber );
		set.add( randomNumber );
	}

	picks.push( getRandomNumber(1, 26) );
	return picks;
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function lock() {
	let numbersCollection = document.getElementById("yourNumbers").getElementsByClassName("circle");
	for(let i=0; i<numbersCollection.length; i++) {
		let val = numbersCollection[i].querySelector("input").value;
		numbersCollection[i].innerHTML = "<p>"+val+"</p>";
	}

	numbersCollection = document.getElementById("yourNumbers").getElementsByClassName("powerball");
	val = numbersCollection[0].querySelector("input").value;
	numbersCollection[0].innerHTML = "<p>"+val+"</p>"
}

function unlock() {
	let numbersCollection = document.getElementById("yourNumbers").getElementsByClassName("circle");
	for(let i=0; i<numbersCollection.length; i++) {
		let val = numbersCollection[i].querySelector("p").innerHTML;
		numbersCollection[i].innerHTML = "<input type=\"number\" value="+val+"></input>";
	}

	numbersCollection = document.getElementById("yourNumbers").getElementsByClassName("powerball");
	val = numbersCollection[0].querySelector("p").innerHTML;
	numbersCollection[0].innerHTML = "<input type=\"number\" value="+val+"></input>";
}

















