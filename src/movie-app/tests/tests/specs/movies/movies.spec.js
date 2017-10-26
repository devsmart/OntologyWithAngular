describe('Module : myMovies.movies', function () {
    describe('Controller: homeController', function () {
        var $scope;
        var controller;
        // load the controller's module
        beforeEach(function () {

            module("myMovies.movies");

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
});