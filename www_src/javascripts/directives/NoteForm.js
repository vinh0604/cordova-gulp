import autosize from 'autosize'

export default function NoteForm () {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: 'templates/NoteForm.html',
        scope: {
            note: '='
        },
        link: function (scope, elem, attrs) {
            autosize(elem[0].querySelectorAll('#content'))
        }
    }
}
