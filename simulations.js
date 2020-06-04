let lockedNumbers = null;

class Ticket {
	constructor(arr, powerball) {
		this.picks = arr;
		this.powerball = powerball;
	}

	format = () => {
		let temp = this.picks.join(", ");
		temp += " (" + this.powerball + ")";
		return temp;
	}
}

function compareTickets(winningTicket, yourTicket) {
	if(winningTicket == null || yourTicket == null)
		return new Set();

	let balls = []
	let res = new Set;

	if(winningTicket.powerball == yourTicket.powerball)
		balls[0] = [5, 5];

	for(var i=0; i<winningTicket.picks.length; i++) {
		balls[winningTicket.picks[i]] = [i];
	}

	for(var i=0; i<yourTicket.picks.length; i++) {
		if(balls[yourTicket.picks[i]] != undefined)
			balls[yourTicket.picks[i]].push(i);
	}

	for(var i=0; i<=69; i++) {
		if(balls[i] != undefined && balls[i].length==2)
			res.add(balls[i][1]);
	}

	return res;
}

function simulate(sims) {
	if(sims == null)
		return;
	
	document.getElementById("startButton").disabled = true;
	
	let closure = function() {
		let counter = sims;

		return function() {
			counter--;
			return counter;
		}
	}();

	let getWinningNumbers = function(closure) {
			resetBorderColor();

			if(closure() == 0) {
				document.getElementById("startButton").disabled = false;
				return;
			}
			
			updateWinningNumbers( generateNumbers() );

			setTimeout(getWinningNumbers, 500, closure);
	}

	getWinningNumbers(closure);
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
	let arr = [];

	let numbersCollection = document.getElementById("yourNumbers").getElementsByClassName("circle");
	for(let i=0; i<numbersCollection.length; i++) {
		let val = numbersCollection[i].querySelector("input").value;
		numbersCollection[i].innerHTML = "<p>"+val+"</p>";
		arr.push(parseInt(val));
	}

	numbersCollection = document.getElementById("yourNumbers").getElementsByClassName("powerball");
	val = numbersCollection[0].querySelector("input").value;
	numbersCollection[0].innerHTML = "<p>"+val+"</p>";
	arr.push(parseInt(val));

	lockedNumbers = chosenNumbersClosure(arr);

	flip(true, false);
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

	lockedNumbers = null;

	flip(false, true);
}

function flip(lockStatus, unlockStatus) {
	document.getElementById("lock").disabled = lockStatus;
	document.getElementById("unlock").disabled = unlockStatus;
}

function chosenNumbersClosure(selectedNumbers) {
	return (index) => {return index==undefined ? selectedNumbers : selectedNumbers[index]};
}

function resetBorderColor() {
	for(let i=0; i<6; i++) {
		let ref = document.getElementById("num"+i);
		ref.style.borderColor = "gray";
		ref.style.borderWidth = "6px";
	}
}

function updateWinningNumbers(numbers) {
	if(lockedNumbers == null)
		return;

	let winningTicket = new Ticket( numbers.slice(0, 5), numbers[5] );
	let yourTicket = new Ticket( lockedNumbers().slice(0, 5), lockedNumbers(5) );

	let winLocations = compareTickets(winningTicket, yourTicket);

	for(let i=0; i<numbers.length; i++) {
		let key = "win" + i;
		
		document.getElementById(key).innerHTML = "<p>" + numbers[i] + "</p>";
		
		if(winLocations.has(i)) {
			let ref = document.getElementById("num"+i); 
			ref.style.borderColor = "green";
			ref.style.borderWidth = "12px";
		}
	}
}

// Testing graph
function test() {
	var ctx = document.getElementById('myChart').getContext('2d');
	var chart = new Chart(ctx, {
    // The type of chart we want to create
 	type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
        label: 'Money Over Time',
            //backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
          	data: [100, 90, 80, 70, 60, 50, 40]
        			}]
    			},

   				// Configuration options go here
    			options: {}
				});
}















