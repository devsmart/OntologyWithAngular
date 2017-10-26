/**
 * Created by harshana on 10/24/17.
 */

describe('Controller: homeController', function () {
    var $scope;
    var controller;
    // load the controller's module
    beforeEach(function () {

        module("myMovies");

        inject(function (_$rootScope_, $controller) {
            $scope = _$rootScope_.$new();
            controller = $controller("homeController", {$scope: $scope});
        });

    });


    //tests
    it("controller should be registered", function () {
        expect(controller).not.toBe(null);
        expect(controller).not.toBe(undefined);
    });

    it('should have values in settings', function () {
        expect($scope.location).not.toBe(undefined);
    });
});

describe('Service: movieService', function () {

    var movieService,
        $scope;
    beforeEach(function () {

        module("myMovies");

    });

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _movieService_) {
        $scope = $rootScope.$new();
        movieService = _movieService_;
    }));

    it("controller should be registered", function () {
        expect(movieService).not.toBe(null);
        expect(movieService).not.toBe(undefined);
    });
    it('should have function called "getUpcomingMovies"', function () {
        expect(movieService.getUpcomingMovies).not.toBe(undefined);
    });
    it('should have function called "getGenre"', function () {
        expect(movieService.getGenre).not.toBe(undefined);
    });

});
