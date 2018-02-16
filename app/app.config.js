(function() {

  angular
    .module('chasecast')
    .config(config)

  function config($stateProvider, $locationProvider, $urlServiceProvider) {
    $locationProvider.html5Mode(true)

    $stateProvider
      .state('home', {
        url: '/',
        component: 'landingpage'
      })

    $urlServiceProvider.rules.otherwise({
      state: 'home'
    })
  }

}());
