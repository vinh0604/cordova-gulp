import marked from 'marked'
import flux from 'flux-angular'

export default ['flux', function NoteView (flux) {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: 'templates/NoteView.html',
        scope: {
            note: '='
        },
        link: function (scope, element, attr) {
            scope.mdToHtml = marked

            scope.clickHandle = () => {
                flux.dispatch('editNote', scope.note)
            }
        }
    }
}]
