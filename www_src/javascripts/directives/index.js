import angular from 'angular'
import ngSanitize from 'angular-sanitize'
import 'flux-angular'
import AppStore from '../stores/index'
import NoteList from './NoteList'
import NoteLine from './NoteLine'
import MainPanel from './MainPanel'
import NoteView from './NoteView'
import NoteForm from './NoteForm'

var AppDirective = angular.module('app.directives', [ngSanitize, AppStore, 'flux'])

AppDirective.directive('noteList', NoteList)
    .directive('noteLine', NoteLine)
    .directive('mainPanel', MainPanel)
    .directive('noteView', NoteView)
    .directive('noteForm', NoteForm)

export default AppDirective = AppDirective.name
