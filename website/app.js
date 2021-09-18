/* Create a new date instance dynamically with JS */
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

/* Personal API Key */
const apiKey = 'cd09373691f6a1e0dba323025352a915';

/* Button Event Listener */
const btn = document.querySelector('#generate');
btn.addEventListener('click', generateBtnClick);

/* Event Listener function to get and post the data */
async function generateBtnClick()
{
    const zipCode = document.querySelector('#zip').value;
    const feelings = document.querySelector('#feelings').value;

    try
    {
        const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;

        const res = await fetch(baseURL);
        const data = await res.json();
    
        const temp = data.main.temp;

        /* POST */
        await fetch('/postWeather', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: "Date: " + newDate,
                temp: "Temperature: " + temp + " °C",
                feelings: "Feeling: " + feelings
            })
        });

        /* GET */
        const nodeRes = await fetch('/getWeather');
        const newData = await nodeRes.json();
        console.log(newData);

        /* Call update UI function */
        updateUI();
    }
    catch(error)
    {
        console.log(error);
    }
}

/* Update UI Function */
async function updateUI()
{
    const req = await fetch('/getWeather');
    try
    {
        const entryData = await req.json();
        document.getElementById('date').innerHTML = entryData.date;
        document.getElementById('temp').innerHTML = entryData.temp;
        document.getElementById('content').innerHTML = entryData.feelings;
    }
    catch(error)
    {
        console.log(error);
    }
}