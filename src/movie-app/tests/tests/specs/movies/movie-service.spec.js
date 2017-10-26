describe('Module : myMovies.movies', function () {
    describe('Service: movieService', function () {

        var movieService,
            $scope;
        beforeEach(function () {

            module("myMovies.movies");

        });

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope, _movieService_) {
            $scope = $rootScope.$new();
            movieService = _movieService_;
        }));

        it("service should be registered", function () {
            expect(movieService).not.toBe(null);
            expect(movieService).not.toBe(undefined);
        });
        it('should have function called "getUpcomingMovies"', function () {
            expect(movieService.getUpcomingMovies).not.toBe(undefined);
        });
        it('should have function called "getMovie"', function () {
            expect(movieService.getMovie).not.toBe(undefined);
        });
        it('should have function called "getCredits"', function () {
            expect(movieService.getCredits).not.toBe(undefined);
        });
        it('should have function called "getMovie"', function () {
            expect(movieService.getMovie).not.toBe(undefined);
        });

    });
});

