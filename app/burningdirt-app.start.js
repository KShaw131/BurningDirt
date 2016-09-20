angular.module('BurningDirt', [

])
.controller('MainCtrl', function($scope) {
  $scope.series = [
    {"id": 0, "name": "GNCC"},
    {"id": 1, "name": "Mid East"},
    {"id": 2, "name": "NCHSA"},
    {"id": 3, "name": "Full Gas"},
    {"id": 4, "name": "MXGP"}
  ];

  $scope.posts = [
    {"id": 0, "title": "MXGP Of The Americas at Charlotte", "series": "MXGP", "content": "Here is the blog content for this article!"},
    {"id": 1, "title": "Pea Ridge", "series": "Mid East", "content": "Here is the blog content for this article!"},
    {"id": 2, "title": "Rockhouse", "series": "NCHSA", "content": "Here is the blog content for this article!"},
    {"id": 3, "title": "Blog Post 4", "series": "Full Gas", "content": "Here is the blog content for this article!"},
    {"id": 4, "title": "Big Buck", "series": "GNCC", "content": "Here is the blog content for this article!"},
    {"id": 5, "title": "Unadilla", "series": "GNCC", "content": "Here is the blog content for this article!"},
    {"id": 6, "title": "Brushy Mountain", "series": "NCHSA", "content": "Here is the blog content for this article!"},
    {"id": 7, "title": "Blog Post 8", "series": "Full Gas", "content": "Here is the blog content for this article!"},
    {"id": 8, "title": "Harris Bridge", "series": "Mid East", "content": "Here is the blog content for this article!"},
    {"id": 9, "title": "Carolina Adventure World", "series": "Mid East", "content": "Here is the blog content for this article!"},
    {"id": 10, "title": "Steele Creek", "series": "GNCC", "content": "Here is the blog content for this article!"}
  ];

  $scope.currentSeries = null;

  function setCurrentSeries(series) {
    $scope.currentSeries = series;

    cancelCreating();
    cancelEditing();
  }

  function isCurrentSeries(series) {
    return $scope.currentSeries !== null && category.name === $scope.currentSeries.name;
  }

  $scope.setCurrentSeries = setCurrentSeries;
  $scope.isCurrentSeries = isCurrentSeries;

  //----------------------------------------------
  //CRUD
  //----------------------------------------------
  function resetCreateForm() {
    $scope.newBlog = {
        title: '',
        series: '',
        content: ''
    }
  }

  function createBlog(newBlog) {
    newBlog.id = $scope.posts.length;
    $scope.posts.push(newBlog);

    resetCreateForm();
    $scope.isCreating = false;
  }

  $scope.createBlog = createBlog;


  $scope.editedBlog = null;


  function setEditedBlog(blogs) {
    $scope.editedBlog = angular.copy(blogs);
  }

  function updateBlog(blogs) {
    var index = _.findIndex($scope.posts, function(b){
        return b.id == blogs.id;
    });
    $scope.blogs[index] = blogs;
    $scope.editedBlog = null;
    $scope.isEditing = false;
  }

  $scope.setEditedBlog = setEditedBlog;
  $scope.updateBlog = updateBlog;

  //----------------------------------------------
  //CREATING AND EDITING STATES OF BLOGS
  //----------------------------------------------
  $scope.isCreating = false;
  $scope.isEditing = false;

  function startCreating() {
    $scope.isCreating = true;
    $scope.isEditing = false;

    resetCreateForm();
  }

  function cancelCreating() {
    $scope.isCreating = false;
  }

  function startEditing() {
    $scope.isCreating = false;
    $scope.isEditing = true;
  }

  function cancelEditing() {
    $scope.isEditing = false;
  }

  function shouldShowCreating() {
    return $scope.currentSeries && !$scope.isEditing;
  }

  function shouldShowEditing() {
    return $scope.isEditing && !$scope.isCreating;
  }

  $scope.startCreating = startCreating;
  $scope.cancelCreating = cancelCreating;
  $scope.startEditing = startEditing;
  $scope.cancelEditing = cancelEditing;
  $scope.shouldShowCreating = shouldShowCreating;
  $scope.shouldShowEditing = shouldShowEditing;

  })
  ;
