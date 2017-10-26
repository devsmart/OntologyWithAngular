var myMovies = angular.module('myMovies', []);

myMovies.controller('homeController', function ($scope, $rootScope) {
    $scope.selectedMovie = undefined;

});

myMovies.service('movieService', function ($http, $q, $rootScope) {
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

myMovies.directive('movieList', function () {
    return {
        restrict: 'E',
        scope: {
            selectedMovie: '='
        },
        controller: function ($scope, $rootScope, movieService) {
            function getData() {
                movieService.getUpcomingMovies().then(function (movies) {
                    console.log(movies)
                    $scope.data = movies.results;
                }).catch(function (exception) {
                    console.error(exception);
                });

            }


            $scope.init = function () {
                getData();
            }
            $scope.showDetails = function (m) {
                //set highlighted 
                if ($scope.selectedMovie && $scope.selectedMovie) {
                    var selected = $scope.data.filter(function (a) {
                        return a.hasOwnProperty('btnClass') && a.btnClass === 'selected';
                    });
                    if (selected && selected.length > 0) {
                        selected[0].btnClass = '';
                    }
                }
                var itm = $scope.data.find(function (a) {
                    return a.id === m.id;
                });
                if (itm) {
                    itm.btnClass = 'selected';
                }
                //check data is exists
                if (!m.hasOwnProperty('data')) {
                    $scope.selectedMovie = m;
                    $scope.selectedMovie.loadingStatus = 1;
                    movieService.getMovie(m.id).then(function (movie) {
                        console.log(movie)
                        $scope.selectedMovie.data = movie;
                        $scope.selectedMovie.loadingStatus = 2;
                        movieService.getCredits(m.id).then(function (credits) {
                            console.log(credits)
                            $scope.selectedMovie.data.credits = credits;
                            $rootScope.$broadcast('credits-updated', $scope.selectedMovie);
                        }).catch(function (exception) {
                            console.error(exception);
                        });
                    }).catch(function (exception) {
                        console.error(exception);
                    });

                } else {
                    $scope.selectedMovie = m;
                    $rootScope.$broadcast('credits-updated', $scope.selectedMovie);
                }
                //  $scope.$broadcast('show-movie', m);
            }
            $scope.getImagePath = function (path) {
                if (path === undefined) return '';
                return 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + path;
            }
            $scope.init();
        },
        templateUrl: 'movie-list.tpl.html'
    }
});

myMovies.directive('movieDetail', function () {
    return {
        restrict: 'E',
        scope: {
            movie: '='
        },
        controller: function ($scope) {
            $scope.directors = [];
            $scope.writers = [];
            $scope.cast = [];


            $scope.init = function () {
                //$scope.movie.loadingStatus = 0;
            };

            $scope.getMovieYear = function (date) {
                var dt = new Date(date);
                return '(' + dt.getFullYear().toString() + ')';
            };

            $scope.getBackgroundStyle = function (img) {
                if (img === undefined) return {};
                var style = {
                    'background-image': 'url(https://image.tmdb.org/t/p/w1400_and_h450_bestv2' + img + ')'
                };
                return style;
            };

            $scope.getImagePath = function (path) {
                if (path === undefined) return '';
                return 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + path;
            };

            $scope.$on('credits-updated', function (event, data) {
                $scope.directors = $scope.movie.data.credits.crew.filter(function (a) { return a.job === 'Director' });
                $scope.writers = $scope.movie.data.credits.crew.filter(function (a) {
                    return a.job === 'Writer' || a.job === 'Novel' || a.job === 'Story'
                });
                $scope.cast = $scope.movie.data.credits.cast.slice(0, 5);;
            });
        },
        templateUrl: 'movie-detail.tpl.html'
    }
});


