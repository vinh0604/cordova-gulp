export default function TopBar () {
    return {
        replace: true,
        templateUrl: 'templates/TopBar.html',
        restrict: 'E',
        link: function (scope, element, attr) {
            scope.keyword = ''
        }
    }
}
