export default ['flux', function NoteLine (flux) {
    return {
        replace: true,
        templateUrl: 'templates/NoteLine.html',
        restrict: 'E',
        scope: {
            note: '='
        },
        controller: function ($scope) {
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
