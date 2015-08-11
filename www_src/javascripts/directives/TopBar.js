export default ['flux', function TopBar (flux) {
    return {
        replace: true,
        templateUrl: 'templates/TopBar.html',
        restrict: 'E',
        link: function (scope, element, attr) {
            scope.keyword = ''
        },
        controller: function ($scope) {
            $scope.addNote = function () {
                flux.dispatch('addNote')
            }
        }
    }
}]
