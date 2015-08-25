var $ = require('jquery')
window.jQuery = $
var chosen = require ('./../../vendor/chosen.jquery')

export default ['flux', function NoteLine (flux) {
    return {
        replace: true,
        templateUrl: 'templates/NoteLine.html',
        restrict: 'E',
        scope: {
            note: '=',
            toggleTagAdd: '='
        },
        controller: function ($scope, $element) {
            $scope.archiveNote = function ($event) {
                $event.preventDefault()
                flux.dispatch('archiveNote', $scope.note)
            }

            $scope.deleteNote = function ($event) {
                $event.preventDefault()
                flux.dispatch('deleteNote', $scope.note)
            }
        }
    }
}]
