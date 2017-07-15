angular.module('QuizApp', [])
    .controller('QuizCtrl', function ($scope, $http) {
        $scope.answered = false;
        $scope.title = "loading question...";
        $scope.options = [];
        $scope.correctAnswer = false;
        $scope.working = false;

        $scope.answer = function () {
            return $scope.correctAnswer ? 'correct' : 'incorrect';
        };

        $scope.nextQuestion = function () {
            $scope.working = true;
            $scope.answered = false;
            $scope.title = "loading question...";
            $scope.options = [];

            $http.get("/api/trivia").then(function (response) {
                var data = response.data;
                var status = response.status;
                var headers = response.headers;
                var config = response.config;

                $scope.options = data.options;
                $scope.title = data.title;
                $scope.answered = false;
                $scope.working = false;
            }).then(function (response) {
                var data = response.data;
                var status = response.status;
                var headers = response.headers;
                var config = response.config;

                $scope.title = "Oops.... something went wrong";
                $scope.working = false;
            });
        };

        $scope.sendAnswer = function (option) {
            $scope.working = true;
            $scope.answered = true;

            $http.post('/api/trivia', { 'questionId': option.questionId, 'optionId': option.id }).then(function (response) {
                var data = response.data;
                var status = response.status;
                var headers = response.headers;
                var config = response.config;

                $scope.correctAnswer = (data === true);
                $scope.working = false;
            }).then(function (response) {
                var data = response.data;
                var status = response.status;
                var headers = response.headers;
                var config = response.config;

                $scope.title = "Oops... something went wrong";
                $scope.working = false;
            });
        };
    });