var burningDirt = angular.module('burningDirt', []);

burningDirt.controller('mainController', function($scope, $http) {

	$scope.blogObj = {};

	// when landing on the page, get all blogs and show them
	$scope.initialize = function() {
		$http.get('/api/blogs')
			.success(function(data) {
				$scope.blogs = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// when submitting the add form, send the text to the node API
	$scope.createBlog = function(blogObj) {
		$http.post('/api/blogs', blogObj)
			.success(function(data) {
				$('input').val('');
				$scope.blogs = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a blog after checking it
	$scope.deleteBlog = function(id) {
		$http.delete('/api/blogs/' + id)
			.success(function(data) {
				$scope.blogs = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

//----------------------------------------------
//From burningdirt-app.start.js
//----------------------------------------------

$scope.series = [
	{"id": 0, "name": "GNCC"},
	{"id": 1, "name": "Mid East"},
	{"id": 2, "name": "NCHSA"},
	{"id": 3, "name": "Full Gas"},
	{"id": 4, "name": "MXGP"}
];

$scope.currentSeries = null;

function setCurrentSeries(series) {
	$scope.currentSeries = series;

	cancelCreating();
}

function isCurrentSeries(series) {
	return $scope.currentSeries !== null && category.name === $scope.currentSeries.name;
}

$scope.setCurrentSeries = setCurrentSeries;
$scope.isCurrentSeries = isCurrentSeries;

function resetCreateForm() {
	$scope.blogObj = {
			title: '',
			series: '',
			content: '',
			image: ''
	}
}

$scope.isCreating = false;

function startCreating() {
	$scope.isCreating = true;

	resetCreateForm();
}

function cancelCreating() {
	$scope.isCreating = false;
}

function shouldShowCreating() {
	return $scope.currentSeries;
}

$scope.startCreating = startCreating;
$scope.cancelCreating = cancelCreating;
$scope.shouldShowCreating = shouldShowCreating;

});
