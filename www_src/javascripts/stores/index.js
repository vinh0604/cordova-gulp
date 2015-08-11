import _ from 'lodash'
import angular from 'angular'
import 'flux-angular'
import Utils from './../utils'

var AppStore = angular.module('app.stores', ['flux'])
.store('NoteStore', function (flux) {
    var state = flux.immutable({
        notes: [],
        selectedNote: { title: '', content: '' },
        editMode: false,
        selectedIndex: -1
    })

    var findIndex = function (note) {
        return _.findIndex(state.notes, function (_note) {
            return _note.index === note.index
        })
    }

    return {
        handlers: {
            'editNote': 'editNote',
            'addNote': 'addNote',
            'saveNote': 'saveNote',
            'setNotes': 'setNotes',
            'selectNote': 'selectNote',
            'addNote': 'addNote'
        },
        addNote: function () {
            let currentMaxId = _.max(state.notes, function (_note) {
                return _note.id
            }) || 0

            let note = {
                id: currentMaxId + 1,
                title: '',
                content: ''
            }

            state = state.notes.unshift(note)
            this.editNote(note)
        },
        selectNote: function (note) {
            let index = findIndex(note)

            state = state.set('selectedNote', note)
            state = state.set('editMode', false)
            state = state.set('selectedIndex', index)
            this.emitChange()
        },
        editNote: function (note) {
            let index = findIndex(note)

            state = state.set('selectedNote', note)
            state = state.set('editMode', true)
            state = state.set('selectedIndex', index)
            this.emitChange()
        },
        saveNote: function (note) {
            note.summary = Utils.truncate(note.content, 30)
            state = state.notes.splice(state.selectedIndex, 1, note)
            state = state.set('selectedNote', note)
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
