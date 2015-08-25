import _ from 'lodash'
import angular from 'angular'
import 'flux-angular'
import Utils from './../utils'
import Fuse from 'fuse.js'

var AppStore = angular.module('app.stores', ['flux'])
.store('NoteStore', function (flux) {
    var dummyNote = { title: '', content: '', tags: [] }
    var archivedNotes = []
    var state = flux.immutable({
        notes: [],
        searchedNotes: null,
        selectedNote: dummyNote,
        editMode: false,
        selectedIndex: -1,
        tags: [],
        keyword: '',
        filteredTags: []
    })

    var findIndex = function (note) {
        return _.findIndex(state.notes, function (_note) {
            return _note.id === note.id
        })
    }

    var search = function (keyword, tags) {
        if (!keyword && tags.length === 0) {
            return null
        }

        let notes = state.notes

        if (keyword) {
            let fuse = new Fuse(notes, { keys: ['title', 'content'] })
            notes = fuse.search(keyword)
        }

        if (tags.length > 0) {
            notes = _.select(notes, (note) => {
                return _.intersection(tags, note.tags).length > 0
            })
        }

        return notes;
    }

    return {
        handlers: {
            'editNote': 'editNote',
            'addNote': 'addNote',
            'saveNote': 'saveNote',
            'setNotes': 'setNotes',
            'selectNote': 'selectNote',
            'searchNote': 'searchNote',
            'deleteNote': 'deleteNote',
            'archiveNote': 'archiveNote',
            'filterTags': 'filterTags',
            'addTag': 'addTag',
            'updateNoteTags': 'updateNoteTags'
        },
        addNote() {
            let currentMaxId = _.max(state.notes, function (_note) {
                return _note.id
            }) || 0

            let note = {
                id: currentMaxId + 1,
                title: '',
                content: '',
                tags: []
            }

            state = state.notes.unshift(note)
            this.editNote(note)
        },
        selectNote(note) {
            state = state.set('selectedNote', note)
            state = state.set('editMode', false)
            this.emitChange()
        },
        editNote(note) {
            let index = findIndex(note)

            state = state.set('selectedNote', note)
            state = state.set('editMode', true)
            this.emitChange()
        },
        saveNote(note) {
            let index = findIndex(note)
            note.summary = Utils.truncate(note.content, 50)
            state = state.notes.splice(index, 1, note)
            if (state.selectedNote.id === note.id) {
                state = state.set('selectedNote', note)
            }
            this.emitChange()
        },
        deleteNote(note) {
            let index = findIndex(note)
            state = state.notes.splice(index, 1)
            state = state.set('selectedNote', dummyNote)
            state = state.set('editMode', false)
            this.emitChange()
        },
        archiveNote(note) {
            archivedNotes.push(note)
            this.deleteNote(note)
        },
        setNotes(notes) {
            state = state.set('notes', notes)
            this.emitChange()
        },
        searchNote({keyword}) {
            state = state.set('keyword', keyword)
            state = state.set('searchedNotes', search(keyword, state.filteredTags))
            state = state.set('selectedNote', dummyNote)
            state = state.set('editMode', false)
            this.emitChange()
        },
        filterTags({tags}) {
            tags = tags || []
            state = state.set('filteredTags', tags)
            state = state.set('searchedNotes', search(state.keyword, tags))
            state = state.set('selectedNote', dummyNote)
            state = state.set('editMode', false)
            this.emitChange()
        },
        addTag({tag}) {
            if (state.tags.indexOf(tag) < 0) {
                state = state.tags.push(tag)
            }
            this.emitChange()
        },
        updateNoteTags({tags, note}) {
            let index = findIndex(note)
            note.tags = tags || []
            state = state.notes.splice(index, 1, note)
            this.emitChange()
        },
        exports: {
            getNotes: function () {
                if (state.searchedNotes) {
                    return state.searchedNotes
                } else {
                    return state.notes
                }
            },
            getSelectedNote: function () {
                return state.selectedNote
            },
            getEditMode: function () {
                return state.editMode
            },
            getTags: function () {
                return state.tags
            }
        }
    }
})

export default AppStore = AppStore.name
