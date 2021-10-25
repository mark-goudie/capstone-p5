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
    ).innerHTML = `Your destination is: ${allData.city}`;
    document.getElementById(
      "days"
    ).innerHTML = `You will be departing in: ${allData.days}`;
    document.getElementById(
      "tripLength"
    ).innerHTML = `The total length of your trip is: ${allData.tripLength} day(s)`;
    document.getElementById(
      "capital"
    ).innerHTML = `The capital city of ${allData.countryData} is: ${allData.capital}`;
    document.getElementById(
      "country"
    ).innerHTML = `The country you are visiting is: ${allData.countryData}`;
    // if (allData.days <= 7) {
    document.getElementById(
      "currentWeather"
    ).innerHTML = `The current weather in ${allData.city} is: ${allData.weatherData.data[0].temp}°C`;
  } catch (error) {
    console.log("error", error);
  }
};

export { updateUI };
