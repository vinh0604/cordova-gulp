var $ = require('jquery')

export default ['flux', 'NoteStore', function NoteList (flux, NoteStore) {
    return {
        replace: true,
        templateUrl: 'templates/NoteList.html',
        restrict: 'E',
        link: function (scope, element, attr) {
            scope.notes = NoteStore.getNotes()
            scope.$listenTo(NoteStore, function () {
                scope.selectedNote = NoteStore.getSelectedNote()
                scope.notes = NoteStore.getNotes()
            })
        },
        controller: function ($scope) {
            $scope.selectNote = function ($event, note) {
                flux.dispatch('selectNote', note)
            }
        }
    }
}]
