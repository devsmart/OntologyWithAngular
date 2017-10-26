(function (module) {
    'use strict';

    module.service('movieService', function ($http, $q, $rootScope) {
        this.ApiKey = '4cb8fcf888a36ad99d8b5f083536cf66';

        this.getUpcomingMovies = function () {
            var results = $http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=' + this.ApiKey + '&language=en-US&page=1')
                .then(function (response) {
                    console.log(response);
                    return response.data;
                })
                .catch(function (exception) {
                    console.error(exception);
                });

            return results;
        };

        this.getMovie = function (id) {
            var results = $http.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + this.ApiKey + '&language=en-US')
                .then(function (response) {
                    console.log(response);
                    return response.data;
                })
                .catch(function (exception) {
                    console.error(exception);
                });
            return results;
        };

        this.getCredits = function (id) {
            var results = $http.get('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=' + this.ApiKey)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                })
                .catch(function (exception) {
                    console.error(exception);
                });
            return results;
        };
 
    });

})(angular.module('myMovies.movies'));