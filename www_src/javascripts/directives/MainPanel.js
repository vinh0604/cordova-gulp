export default ['NoteStore', function MainPanel (NoteStore) {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: 'templates/MainPanel.html',
        link: function (scope, element, attr) {
            scope.note = NoteStore.getSelectedNote()
            scope.editMode = NoteStore.getEditMode()
            scope.$listenTo(NoteStore, function () {
                scope.note = NoteStore.getSelectedNote()
                scope.editMode = NoteStore.getEditMode()
            })
        }
    }
}]
