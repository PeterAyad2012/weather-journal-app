//error message
const err = document.getElementById('err');

// Personal API Key for OpenWeatherMap AP
const callAPI = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const personalAPI = '&APPID=bc2b55820cf1df1556e72a2e4d9da111';

// Event listener to add function to existing HTML DOM element
const submit = document.getElementById('generate');
submit.addEventListener('click', submitFunction);

/* Function called by event listener */
function submitFunction (){
    const zip = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    
    getAPI(callAPI+zip+personalAPI)
    
    .then (function(data){
        if(data.cod == "404"){
            err.innerHTML = "Please, Enter a valid zip code";
            err.style.color = "red";
        }else{
            const temp = data.list[0].main.temp - 272.15;
            const date = data.list[0].dt_txt;
            
            postData('/add', {date: date, temp: temp.toFixed(2), feel:feeling});

            getData();

            err.innerHTML = "";
            result.style.display = "block";
        }
    })
}

/* Function to GET Web API Data*/
const getAPI = async (url)=>{
    
    const res = await fetch(url)
    try{
        const data = await res.json();
        console.log(data);
        return data;
    } catch(Error){
        console.log("error",Error);
    }
    
}

/* Function to POST data */
const postData = async (url='', data = {})=>{
    const response = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    try{
        const newData = await response.json();
        return newData;
    }catch(Error){
        console.log("error",Error);
    }
}

/* Function to GET Project Data */
const getData = async()=>{
    const req = await fetch('/all')
    
    try{
        const finalData = await req.json();
        console.log(finalData);
        let len = finalData.length - 1;
        document.getElementById('date').innerHTML = `Date: ${finalData[len].date}`;
        document.getElementById('temp').innerHTML = `Temprature: ${finalData[len].temp}°c`;
        document.getElementById('content').innerHTML = `Content: ${finalData[len].feel}`;
        
    } catch(Error){
        console.log("error",Error);
    }
}


/* result close event listener */
const close = document.getElementById('close');
const result = document.getElementById('overlay');
close.addEventListener('click', closeResult);

function closeResult(){
    result.style.display = "none";
}
