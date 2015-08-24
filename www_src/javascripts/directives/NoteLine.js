export default function NoteLine (flux) {
    return {
        replace: true,
        templateUrl: 'templates/NoteLine.html',
        restrict: 'E',
        scope: {
            note: '='
        }
    }
}
