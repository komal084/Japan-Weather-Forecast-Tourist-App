(function($, document, window){
	
	$(document).ready(function(){

		// Cloning main navigation for mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Mobile menu toggle 
		$(".menu-toggle").click(function(){
			$(".mobile-navigation").slideToggle();
		});

        //API call after selecting the city name
		$("#submit").click(function (e) {
			const appKey = "f24f40b1c24505685fce3b8acd0fcffc"; // App Key to initialise API

            var validate = Validate(); // For error message when no city has been selected
            var todayDate = GetTodayDate(); // For retrieving Today's date
            $("#message").html(validate);

            if (validate.length == 0) {
                $.ajax({
                    type: "POST",
                    url: "http://api.openweathermap.org/data/2.5/weather?id=" + $("#citySelect").val() + "&appid=" + appKey	+ "&units=metric",
                    dataType: "json",
                    success: function (result, status, xhr) {

                        // Creating weather table parameter-values after API response success
                        
                        // City Name + Country Name
                        var cityName = result["name"];
                        document.getElementById("cityName").innerHTML = cityName + ", Japan";

                        // Current Temperature of selected city
                        var currentTemp = result["main"]["temp"].toPrecision(2);
                        document.getElementById("currentTemp").innerHTML = currentTemp + "<sup>o</sup>C";

                        // Weather pressure status
                        var pressureVal = result["main"]["pressure"];
                        document.getElementById("pressureVal").innerHTML = pressureVal;

                        // Current cloud status
                        var cloudVal = result["clouds"]["all"];
                        document.getElementById("cloudVal").innerHTML = cloudVal;

                        // Current rain situation
                        var rainDesc = result["weather"][0]["description"];
                        document.getElementById("rainDesc").innerHTML = rainDesc;
                       
                       // Weather humidity status
                        var humidityVal = result["main"]["humidity"];
                        document.getElementById("humidityVal").innerHTML = humidityVal;
                        
                        // Min value of temperature for the day
                        var minTempVal = result["main"]["temp_min"].toPrecision(2);
                        document.getElementById("minTempVal").innerHTML = minTempVal + "<sup>o</sup>C";
                        
                        // Max value of temperature for the day
                        var maxTempVal = result["main"]["temp_max"].toPrecision(2);
                        document.getElementById("maxTempVal").innerHTML = maxTempVal + "<sup>o</sup>C";

                        // current fog level
                        if (result["weather"][1]) {
                            var mistVal = result["weather"][1]["main"];
                            document.getElementById("mistVal").innerHTML = mistVal;
                        }

                        // Visibility during current mist state
                        if (result["weather"][1]) {
                            var mistDesc = result["weather"][1]["description"];
                            document.getElementById("mistDesc").innerHTML = mistDesc;
                        }

                        // Current wind speed
                        var windVal = result["wind"]["speed"];
                        document.getElementById("windVal").innerHTML = windVal + "km/h";

                        // Direction of wind
                        var directionVal = result["wind"]["deg"];
                        document.getElementById("directionVal").innerHTML = directionVal + "<sup>o</sup>";

                        // Rain situation per hour
                        if (result["rain"] && !$.isEmptyObject(result["rain"])) {
                            var rainVal = result["rain"]["1h"];
                            document.getElementById("rainVal").innerHTML = rainVal + "&#37; rain";
                        } else if (result["snow"] && !$.isEmptyObject(result["snow"])) {
                            var rainVal = result["snow"]["1h"];
                            document.getElementById("rainVal").innerHTML = rainVal + "&#37; snow";
                        } else if (result["rain"] && result["snow"]) {
                            document.getElementById("rainVal").innerHTML = "Rain+Snow";
                        }
                        else {
                            var rainLabel = result["weather"][0]["main"];
                            document.getElementById("rainVal").innerHTML = rainLabel;
                        }
                    },

                    error: function (xhr, status, error) {
                        alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
                        // API response error handling
                    }
                });
            }
        });
        
        // Function for error message when no city has been selected
        function Validate() {
            var errorMessage = "";
            if ($("#citySelect").val() == "Select") {
                errorMessage += "<div class='err-msg'> ►  Please select a City Name you want to see weather forecast for...</div>";
            }
            return errorMessage;
        }

        // Function for current date, month & year. Format: [ DD Month YYYY ] (Eg. - 11 March 2019)
        function GetTodayDate() {
            var months = ['January','February','March','April','May','June','July','August','September','October','November','December']; // Month name array
            var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]; // weekday name array

            var todayDate = new Date(); //initialise object for current date
            var dayName = weekday[todayDate.getDay()]; //yields day name
            var dd = todayDate.getDate(); //yields date
            var MM = months[todayDate.getMonth()]; //yields month name
            var yyyy = todayDate.getFullYear(); //yields year

            var currentDate = dd + " " + MM + " " + yyyy; // Format for date display [ 11 March 2019]

            document.getElementById("todayDate").innerHTML = currentDate;
            document.getElementById("dayName").innerHTML = dayName;
        }

	});

	$(window).load(function(){

	});

})(jQuery, document, window);


