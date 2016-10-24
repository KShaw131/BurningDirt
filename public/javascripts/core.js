var burningDirt = angular.module('burningDirt', []);

burningDirt.controller('mainController', function($scope, $http) {

	$scope.blogObj = {};
	$scope.editedBlog = {};
	$scope.gotBlog = {};

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

	//---------------------------------------
	// CRUD
	//---------------------------------------

	// create a blog after checking it
	$scope.createBlog = function(blogObj) {
		$http.post('/api/blogs', blogObj)
			.success(function(data) {
				$('input').val('');
				$scope.blogs = data;
				resetCreateForm();
				cancelCreating();
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

	// get blog by id for edit form
	$scope.getBlog = function(id) {
		$http.get('/api/blogs/' + id)
			.success(function(data) {
				$scope.gotBlog = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
		};

	// edit a blog after checking it
	$scope.updateBlog = function(editedBlog) {
		$http.put('/api/blogs/' + editedBlog._id, editedBlog)
			.success(function(data) {
				$scope.blogs = data;
				$scope.isEditing = false;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

$scope.series = [
	{"id": 0, "name": "GNCC"},
	{"id": 1, "name": "Mid East"},
	{"id": 2, "name": "NCHSA"},
	{"id": 3, "name": "Full Gas"},
	{"id": 4, "name": "MXGP"}
];

$scope.currentSeries = null;
$scope.isCreating = false;
$scope.isEditing = false;

function startEditing() {
	$scope.isEditing = true;
	$scope.isCreating = false;
}

function cancelEditing() {
	$scope.isEditing = false;
}

function setCurrentSeries(series) {
	$scope.currentSeries = series;

	cancelCreating();
}

function isCurrentSeries(series) {
	return $scope.currentSeries !== null && category.name === $scope.currentSeries.name;
}

function resetCreateForm() {
	$scope.blogObj = {
			title: '',
			series: '',
			content: '',
			image: ''
	}
}

function startCreating() {
	$scope.isCreating = true;
	$scope.isEditing = false;
	resetCreateForm();
}

function cancelCreating() {
	$scope.isCreating = false;
}

//Making variables visible in scope
$scope.setCurrentSeries = setCurrentSeries;
$scope.isCurrentSeries = isCurrentSeries;
$scope.startCreating = startCreating;
$scope.cancelCreating = cancelCreating;
$scope.startEditing = startEditing;
$scope.cancelEditing = cancelEditing;

});
