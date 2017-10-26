angular.module('myMovies.movies', []);
angular.module('myMovies.movie-list', []);
angular.module('myMovies.movie-detail', []);
angular.module('myMovies.templates', []);

angular.module('myMovies.modules-all', [
    'myMovies.movies',
    'myMovies.movie-list',
    'myMovies.movie-detail',
    'my-movie.templates'
]);
