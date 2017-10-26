(function (module) {
    'use strict';

    module.directive('movieList', function () {
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
            templateUrl: 'app/movie-list/movie-list.html'
        };
    });

})(angular.module('myMovies.movie-list'));