/* Global Variables */

// Personal API Key for OpenWeatherMap API
const APIkey = '5c5c584262989985ffa3b1d44da149e1';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate =  d.getDate()+' '+ d.toLocaleString('default', { month: 'long' })+' '+ d.getFullYear();

/* Function to Handle Async Requests Errors */
const handleError = (err) => {

	if (err.message){
		alert(err.message);
	} else {
		alert('Something went wrong, try again later!');
	}
}


/* Function to Get Web APIWeather Data*/
const getWeather = async (zipCode) => {
	let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${APIkey}`);

	let data = await response.json();

	//handle not 200 response
	if(!response.ok){
		throw new Error(data.message);
	}
	return(data.main.temp);
}

/* Function to Get user record data*/
const getData = async () => {
	const zipCode = document.querySelector('#zip').value;

	const data = {};
	data.date = newDate;

	data.temperature = await getWeather(zipCode);
	data.feelings = document.querySelector('#feelings').value;
	return data;
}

/* Function to Display Entries/ Build UI Records */
function updateEntries(entry){
	const entriesDiv = document.querySelector('.holder-entry');

	const entryHolder = document.createElement('div');
	entryHolder.classList.add("entryHolder","card", "bg-light", "mb-3");
	entryHolder.innerHTML =`
		<div id = "date" class="card-header">${entry.date}</div>
		<div class="card-body">
			<h5 id = "temp" class="card-title">${entry.temperature} °F</h5>
			<p id = "content" class="card-text">${entry.feelings}</p>
		</div>`;
   	entriesDiv.appendChild(entryHolder);
}

/* Functions called by event listener */

/* Function to GET Project Data */
async function getEntries(url=''){

	const response = await fetch(url);
	const entries = await response.json();

	//handle not 200 response
	if(!response.ok){
		throw new Error;
	}

	entries.forEach(entry=>{
		updateEntries(entry);
	});
}

/* Function to POST data */
async function postEntry(url='', data={}){

	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify(data),
		headers:{
			"Content-type": "application/json; charset=UTF-8"
		}
	});

	//handle not 200 response
	if(!response.ok){
		throw new Error;
	}

	updateEntries(data);
	document.querySelector('.journal-entry-form').reset();
}

/* execution starts here */
// Event listener to add function to existing HTML DOM element
document.addEventListener('DOMContentLoaded', async ()=>{
	try {
		await getEntries('/all');
	} catch (err) {
		handleError(err);
	}

	const generateBtn = document.querySelector('#generate');
	generateBtn.addEventListener('click', async () => {
		try{
			const data = await getData();
			await postEntry('/add', data);
		} catch (err) {
			handleError(err);
		}
	}); 
});