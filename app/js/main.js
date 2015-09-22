
  var error,
      options,
      success,
      lat,
      lon,
      url = "http://api.wunderground.com/api/db432a740561cd8d/forecast/geolookup/conditions",
      response,
      clickCount = 0,
      time = moment().format();

  options = {
    timeout: 5000,
    maximumAge: 0
  };

  success = function(pos) {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
    $.getJSON( url + "/q/" + lat + "," + lon + ".json", function( data ) {
      response = data;
    })
    .done(function() {
      display(response);
    })
  };

  error = function(err) {
    console.warn("ERROR(" + err.code + "): " + err.message);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);

  function display(data) {
    var temp = data.current_observation.temp_f;
    if (temp > 70) {
      $("#iconBox").toggleClass("hidden")
      $("#yesOrNo").text("NO");
    }
    else {
      $("#iconBox").toggleClass("hidden")
      $("#yesOrNo").text("YES");
    }
  }
