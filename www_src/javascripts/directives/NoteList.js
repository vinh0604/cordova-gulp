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

            $(element).on('keydown', 'li', function (event) {
                let target = $(event.currentTarget)

                switch(event.keyCode) {
                    case 38:
                        target.prev().click()
                        break
                    case 40:
                        target.next().click()
                        break
                    case 13:
                        target.click()
                        break
                }
            })
        },
        controller: function ($scope) {
            $scope.selectNote = function ($event, note) {
                flux.dispatch('selectNote', note)
                setTimeout(function() {
                    $('.sidebar__item--selected').focus()
                }, 0);
            }
        }
    }
}]
