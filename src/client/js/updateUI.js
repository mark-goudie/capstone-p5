// Function to update UI //

const updateUI = async (webformatURL) => {
  const request = await fetch("http://localhost:8080/all");
  try {
    const allData = await request.json();
    document.getElementById(
      "dateToday"
    ).innerHTML = `Today's date: ${allData.dateToday}  (dd/mm/yyyy)`;
    document.getElementById("picture").src = webformatURL;
    document.getElementById("picture").alt = allData.city;
    document.getElementById("icon").innerHTML = `<img src=${allData.icon}>`;
    document.getElementById("map").innerHTML = `<img src=${allData.map}>`;
    document.getElementById(
      "city"
    ).innerHTML = `Your trip's destination is: ${allData.city}`;
    document.getElementById(
      "days"
    ).innerHTML = `Only ${allData.days} days to go!`;
    document.getElementById(
      "tripLength"
    ).innerHTML = `Your trip will last ${allData.tripLength} days`;
    document.getElementById(
      "capital"
    ).innerHTML = `This capital city is: ${allData.capital}`;
    document.getElementById(
      "country"
    ).innerHTML = `Country: ${allData.countryData}`;
    // if (allData.days <= 7) {
    document.getElementById(
      "currentWeather"
    ).innerHTML = `Current weather is: ${allData.weatherData.data[0].temp}°C`;
  } catch (error) {
    console.log("error", error);
  }
};

export { updateUI };
