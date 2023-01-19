// Global Variables
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",&appid=9916ce30d693573571bb4a6b36bc4068&units=metric";

// Create a new date instance dynamically with JS
const newDate = () => {
  let d = new Date();
  return (d.getMonth()+1) + '.' + d.getDate() + '.' + d.getFullYear();
}

//Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", Action);

/* Function called by event listener */
function Action() {
  //get informations from the user
  const zipCode = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;
  if (zipCode !== '') {
    getData(baseURL, zipCode, apiKey)
    .then(function (data) {
      if (data && data.main) {
      // add data
      postData('http://localhost:4000/add', { temp: (data.main.temp), date: newDate(), feeling: content });
      return updateUI();
      } else {
      alert('The zip code you entered is invalid.');
      }
      })
      .catch(function (error) {
      console.log(error);
      alert('An error occurred while trying to get the weather data.');
      });
      } else {
      alert("Please enter a valid Zip code");
      }
      }

//Function to GET Web API Data
const getData = async (baseURL, zip, apiKey) => {
  try {
    const res = await fetch(baseURL + zip + apiKey);
    const data = await res.json();

    if (!data || data.cod != 200) {
      throw `${data.message}`;
    }
    return data;
  } catch (error){


  }
}

// POST data
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
  'Content-Type': 'application/json',
  },
  body: JSON.stringify({
  temp: data.temp,
  date: data.date,
  feeling: data.feeling
  }),
  });
  
  try {
  const newData = await response.json();
  return newData;
  } catch (error) {
  console.log("error", error);
  }
  }
  // update ui
  const updateUI = async () => {
    const request = await fetch('http://localhost:4000/all');
    try {
    const allData = await request.json();
    console.log(allData);
    // update the data
    if (allData.date !== undefined && allData.temp !== undefined && allData.feeling !== undefined) {
      document.getElementById('date').innerHTML = `Date is: ${allData.date}`;
      document.getElementById('temp').innerHTML = `Temp is: ${allData.temp}`;
      document.getElementById('content').innerHTML = `Feeling is: ${allData.feeling}`;
    }
    } catch (error) {
    console.log('error', error);
    }
  };
  