export default ['flux', function NoteLine (flux) {
    return {
        replace: true,
        templateUrl: 'templates/NoteLine.html',
        restrict: 'E',
        scope: {
            note: '='
        },
        link: function (scope, element, attr) {
            scope.editNote = function (note) {
                flux.dispatch('editNote', note)
            }

            scope.selectNote = function (note) {
                flux.dispatch('selectNote', note)
            }
        }
    }
}]
