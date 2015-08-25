import _ from 'lodash'
var $ = require('jquery')

export default ['flux', 'NoteStore', function NoteList (flux, NoteStore) {
    return {
        replace: true,
        templateUrl: 'templates/NoteList.html',
        restrict: 'E',
        link: function (scope, element, attr) {
            scope.notes = NoteStore.getNotes()
            scope.tags = NoteStore.getTags()
            scope.$listenTo(NoteStore, function () {
                scope.selectedNote = NoteStore.getSelectedNote()
                scope.notes = NoteStore.getNotes()
                scope.tags = NoteStore.getTags()
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

            setTimeout(function() {
                scope.chosen = $(element).find('#note_tags').chosen({
                    width: '100%',
                    create_option(tag) {
                        flux.dispatch('addTag', { tag: tag })
                        this.append_option({
                            value: tag,
                            text: tag
                        })
                    }
                })

                scope.chosen.change(function (event) {
                    if (scope.currentNote) {
                        flux.dispatch('updateNoteTags', { tags: $(this).val(), note: scope.currentNote })
                    }
                })

                $(element).find('.chosen-container .search-field input').blur(() => {
                    setTimeout(function() {
                        element.find('.sidebar__list__tags').hide()
                    }, 1000);
                })
            }, 0)
        },
        controller: function ($scope, $element) {
            $scope.selectNote = function ($event, note) {
                flux.dispatch('selectNote', note)
                setTimeout(function() {
                    $('.sidebar__item--selected').focus()
                }, 0);
            }

            $scope.toggleTagAdd = function ($event, note) {
                $event.preventDefault()
                $scope.chosen.val('').html('').trigger('chosen:updated')

                if (!$scope.currentNote || note.id != $scope.currentNote.id) {
                    $scope.currentNote = note
                    _.each($scope.tags, (tag) => {
                        $scope.chosen.append('<option value="' + tag + '">' + tag + '</option>')
                    })
                    $scope.chosen.val(note.tags).trigger('chosen:updated')

                    let position = $($event.currentTarget).closest('.sidebar__item').position()
                    $element.find('.sidebar__list__tags').show().css({top: position.top + 35 + 'px'})
                } else {
                    $scope.currentNote = null
                    $element.find('.sidebar__list__tags').hide()
                }
            }
        }
    }
}]
