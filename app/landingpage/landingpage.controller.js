(function() {
  angular
    .module('chasecast')
    .controller('LandingPageController', LandingPageController)

  function LandingPageController($http) {
    const vm = this
    vm.showWeather = false
    vm.errorMessage = false
    vm.loading = false

    vm.getWeather = function() {
      let zipcode = vm.zipcode
      vm.showWeather = false
      vm.loading = true
      const numbers = /^[0-9]+$/;
      if ((zipcode) && (zipcode.length == 5) && zipcode.match(numbers)) {
        vm.errorMessage = false
        $http.get(`https://api.wunderground.com/api/0c756c2f6fb68c00/geolookup/q/${zipcode}.json`)
          .then(results => {
            console.log('city: ', results);
            vm.city = results.data.location.city;
            vm.state = results.data.location.state;
            vm.link = results.data.location.wuiurl;
          })


        $http.get(`http://api.wunderground.com/api/0c756c2f6fb68c00/conditions/q/${zipcode}.json`)
          .then(result => {
            console.log('current: ', result);
            vm.currentCondition = result.data.current_observation.weather;
            vm.currentIcon = result.data.current_observation.icon_url;
            vm.currentTemp = Math.round(result.data.current_observation.temp_f);
            vm.currentWind = result.data.current_observation.wind_string;
          })

        $http.get(`https://cors-anywhere.herokuapp.com/http://api.wunderground.com/api/0c756c2f6fb68c00/animatedradar/q/${zipcode}.gif?newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50`)
          .then(results => {
            console.log('radar: ', results);
            vm.radar = results.config.url.substring(36);
            vm.showWeather = true
            vm.loading = false
          })
        $http.get(`https://api.wunderground.com/api/0c756c2f6fb68c00/forecast10day/q/${zipcode}.json`)
          .then(results => {
            console.log('10 day: ', results);
            vm.weather = results.data.forecast.simpleforecast.forecastday
          })

        vm.weather = []
        vm.zipcode = ''
      } else {
        vm.errorMessage = true;
        vm.showWeather = false
        vm.zipcode = ''
      }
    }

  }
}());
