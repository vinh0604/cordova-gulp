import angular from 'angular'
import directives from './directives/index'

var app = angular.module('app', [directives])

app.controller('MainCtrl', ['flux', '$timeout', function (flux, $timeout) {
    let notes = [
        {
            title: 'Note 1',
            summary: 'Lorem ipsum dolor sit amet',
            content: '**Lorem ipsum dolor** sit amet, consectetur adipisicing elit. Qui aut maxime, illum ipsum quo, voluptatem quod dolorem, facere incidunt nam ducimus velit sunt est magnam minus! Illo itaque dignissimos iure.'
        },
        {
            title: 'Note 2',
            summary: 'Lorem ipsum dolor sit amet',
            content: '*Lorem ipsum dolor* sit amet, consectetur adipisicing elit. Qui aut maxime, illum ipsum quo, voluptatem quod dolorem, facere incidunt nam ducimus velit sunt est magnam minus! Illo itaque dignissimos iure.'
        }
    ]
    $timeout(function() {
        flux.dispatch('setNotes', notes)
    }, 0);
}])

angular.bootstrap(document.getElementById('main'), ['app'])
