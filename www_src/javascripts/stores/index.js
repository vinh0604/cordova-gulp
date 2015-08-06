import angular from 'angular'
import 'flux-angular'

var AppStore = angular.module('app.stores', ['flux'])
.store('NoteStore', function (flux) {
    var state = flux.immutable({
        notes: [],
        selectedNote: { title: '', content: '' },
        editMode: false
    })

    return {
        handlers: {
            'editNote': 'editNote',
            'addNote': 'addNote',
            'saveNote': 'saveNote',
            'setNotes': 'setNotes',
            'selectNote': 'selectNote'
        },
        selectNote: function (note) {
            state = state.set('selectedNote', note)
            state = state.set('editMode', false)
            this.emitChange()
        },
        editNote: function (note) {
            state = state.set('selectedNote', note)
            state = state.set('editMode', true)
            this.emitChange()
        },
        setNotes: function (notes) {
            state = state.set('notes', notes)
            this.emitChange()
        },
        exports: {
            getNotes: function () {
                return state.notes
            },
            getSelectedNote: function () {
                return state.selectedNote
            },
            getEditMode: function () {
                return state.editMode
            }
        }
    }
})

export default AppStore = AppStore.name
