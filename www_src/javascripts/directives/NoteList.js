export default ['NoteStore', function NoteList (NoteStore) {
    return {
        replace: true,
        templateUrl: 'templates/NoteList.html',
        restrict: 'E',
        link: function (scope, element, attr) {
            scope.notes = NoteStore.getNotes()
            scope.$listenTo(NoteStore, function () {
                scope.notes = NoteStore.getNotes()
            })
        }
    }
}]
