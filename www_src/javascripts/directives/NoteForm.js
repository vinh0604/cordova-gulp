import autosize from 'autosize'

export default ['flux', function NoteForm (flux) {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: 'templates/NoteForm.html',
        scope: {
            note: '='
        },
        link: function (scope, elem, attrs) {
            let contentElem = elem[0].querySelector('#content')

            contentElem.addEventListener('focus', function () {
                autosize(contentElem)
            })
        },
        controller: function ($scope) {
            $scope.saveNote = function ($event) {
                $event.preventDefault()
                flux.dispatch('saveNote', $scope.note)
            }

            $scope.enterToSaveNote = function ($event) {
                if ($event.keyCode === 13) {
                    $event.preventDefault()
                    $scope.saveNote($event)
                }
            }
        }
    }
}]
