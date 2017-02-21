/**
 * Created by Jon-Eric Cook on 2/12/2017.
 */
var apiKey = "fa7d80c48643dfadde2cced1b1be6ca1";
document.addEventListener("DOMContentLoaded", bindButtons);

function bindButtons()
{
    document.getElementById("zipCountrySubmit").addEventListener("click", function (event)
    {
        var req = new XMLHttpRequest();
        var zipCountry = document.getElementById("zipCountry").value;
        req.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip=" + zipCountry + "&units=imperial" + "&appid=" + apiKey, true);

        req.addEventListener("load", function ()
        {
            var response = JSON.parse(req.responseText);
            document.getElementById("cityName").textContent = response.name;
            document.getElementById("temp").textContent = response.main.temp;
            document.getElementById("hum").textContent = response.main.humidity;
        });

        req.send(null);
        event.preventDefault();
    });

    document.getElementById("cityStateSubmit").addEventListener("click", function (event)
    {
        var req = new XMLHttpRequest();
        var cityState = document.getElementById("cityState").value;
        req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + cityState + "&units=imperial" + "&appid=" + apiKey, true);

        req.addEventListener("load", function ()
        {
            var response = JSON.parse(req.responseText);
            document.getElementById("cityName").textContent = response.name;
            document.getElementById("temp").textContent = response.main.temp;
            document.getElementById("hum").textContent = response.main.humidity;
        });

        req.send(null);
        event.preventDefault();
    });

    document.getElementById('postingSubmit').addEventListener('click', function(event)
    {
        var req = new XMLHttpRequest();
        var payload = document.getElementById('posting').value;
        req.open('POST', 'http://httpbin.org/post', true);
        req.setRequestHeader('Content-Type', 'application/json');

        req.addEventListener('load',function()
        {
            var response = JSON.parse(req.responseText);
            document.getElementById('returned').textContent = response.data;
        });
        req.send(JSON.stringify(payload));
        document.getElementById('submitted').textContent = payload;
        event.preventDefault();
    });
}