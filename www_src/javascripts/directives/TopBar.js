var $ = require('jquery')
window.jQuery = $
var chosen = require ('./../../vendor/chosen.jquery')

export default ['flux', function TopBar (flux) {
    return {
        replace: true,
        templateUrl: 'templates/TopBar.html',
        restrict: 'E',
        link: function (scope, element, attr) {
            scope.tags = ['foo', 'bar', 'shoe']
            setTimeout(function() {
                $(element).find('#tags').chosen({ width: '100%' }).change(function (event) {
                    flux.dispatch('filterTags', { tags: $(this).val() })
                })
            }, 0)
        },
        controller: function ($scope, $element) {
            $scope.keyword = ''
            $scope.addNote = function ($event) {
                $event.preventDefault()
                flux.dispatch('addNote')
            }

            $scope.search = function ($event) {
                flux.dispatch('searchNote', { keyword: $scope.keyword })
            }

            $scope.toggleTagFilter = function ($event) {
                $event.preventDefault()
                $element.find('.sidebar__topbar__tags').toggle()
            }
        }
    }
}]
