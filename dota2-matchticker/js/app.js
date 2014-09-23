var dota2matchticker = angular.module('components', ['ngResource'])
    .directive('liveMatch', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/live-match.html'
        }
    })
    .directive('upcommingMatch', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/upcomming-match.html'
        }
    })
    .directive('recentMatch', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/recent-match.html'
        }
    })

dota2matchticker.controller('MatchesController', function ($scope, $resource) {
    $scope.matchesAPI = $resource('http://app-ninja9studio.rhcloud.com/dota2-matchticker/gosugamer/matches/:action',
        {action: 'live', key: 'test'},
        {get: {method: 'GET'}});

    $scope.matchesAPI.get({action: 'live'}, function (result) {
        $scope.liveMatches = result.data.matches;
    })
    $scope.matchesAPI.get({action: 'upcomming'}, function (result) {
        $scope.upcommingMatches = result.data.matches;
    })
    $scope.matchesAPI.get({action: 'result'}, function (result) {
        $scope.recentMatches = result.data.matches;

        for (var i = 0; i < $scope.recentMatches.length; i++) {
            if ($scope.recentMatches[i].team1.name == $scope.recentMatches[i].winner.name) {
                $scope.recentMatches[i].team1.isWinner = true;
                $scope.recentMatches[i].team2.isWinner = false;
            } else {
                $scope.recentMatches[i].team1.isWinner = false;
                $scope.recentMatches[i].team2.isWinner = true;
            }
        }
    })
})

angular.module('Dota2Matchticker', ['components'])


