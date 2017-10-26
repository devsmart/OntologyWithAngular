describe('Module : myMovies.movie-list', function () {
    describe('Directive: movieList', function () {
        var $scope,
            $rootScope;
        var dirElement,
            compile,
            $templateCache;

        function getCompiledElement() {
            //create and compile the directive
            var element = angular.element('<movie-list />');
            var compiledElement = compile(element)($rootScope);
            $scope.$digest();

            //isolate the sope for the controller
            //  scope = element.isolateScope();
            //   scope.$digest();
            return compiledElement;
        }

        beforeEach(function () {

            module("myMovies.movie-list");

            inject(function (_$rootScope_, _$templateCache_, _$compile_) {
                $rootScope = _$rootScope_;
                $scope = _$rootScope_.$new();
                $templateCache = _$templateCache_;
                compile = _$compile_;
                dirElement = getCompiledElement();

            });

        });


        //tests
        it("Directive should have been defined", function () {
            expect(dirElement).not.toBe(null);
            expect(dirElement).not.toBe(undefined);
        });


    });
});
