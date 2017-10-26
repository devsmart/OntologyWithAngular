(function (module) {
    'use strict';

    module.directive('movieDetail', function () {
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
            templateUrl: 'app/movie-detail/movie-detail.html'
        };
    });


})(angular.module('myMovies.movie-detail'));