export default function NoteForm () {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: 'templates/NoteForm.html',
        scope: {
            note: '='
        }
    }
}
