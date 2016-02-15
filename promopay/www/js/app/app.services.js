angular.module('PromoPay.app.services', [])

.service('UserService', function() {
  var setUser = function(user_data) {
    window.localStorage.starter_facebook_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_facebook_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
})

.service('AuthService', function ($http, $q){

  this.saveUser = function(user){
    window.localStorage.PromoPay_user = JSON.stringify(user);
  };

  this.getLoggedUser = function(){

    return (window.localStorage.PromoPay_user) ?
      JSON.parse(window.localStorage.PromoPay_user) : null;
  };

  this.validateUserToken = function(user) {

    var baseString = user.userName + ":" + user.password;
    var genertatedToken = btoa(baseString);

    return genertatedToken;

  };

  this.generateUserToken = function() {
    var user = this.getLoggedUser();

    var baseString = user.userName + ":" + user.password;
    var genertatedToken = btoa(baseString);

    return genertatedToken;

  };

  this.getOauthToken = function(skipCache){
    var dfd = $q.defer();

    if(skipCache !== true) {
      if(window.localStorage.access_token && window.localStorage.access_token !== 'undefined') {
        dfd.resolve(window.localStorage.access_token);
        return dfd.promise;
      }
    }

    var authData = {
      grant_type: 'client_credentials',
      client_id: 'PROMOAPP'
    };

    var genertatedToken = this.generateUserToken();
    var authPayload = JSON.stringify(authData);

    $http.post('http://178.62.124.228/api/v1/oauth/tokens',
    authData, {
      headers: {
        'Authorization': "Basic " + genertatedToken
      }
    }).success(function(response) {
      window.localStorage.access_token = response.data.access_token;
      dfd.resolve(response.data.access_token);
    });
    return dfd.promise;
  };

})

.service('PostService', function ($http, $q, AuthService){

  this.getOfferImpressions = function(token, skipCache){
    var dfd = $q.defer();


    if(skipCache !== true) {
      if(window.localStorage.offerImpressions && window.localStorage.offerImpressions !== 'undefined') {
        var offerImpressionsArray = JSON.parse(window.localStorage.offerImpressions);
        dfd.resolve(offerImpressionsArray);
        return dfd.promise;
      }
    }

    var user = AuthService.getLoggedUser();

    var url = 'http://178.62.124.228/api/v1/users/' + user._id + '/offers';

    $http.get(url, {
      headers: {
        'Authorization': "Bearer " + token
      }
    }).success(function(data) {
      var offerImpressions = data;
      window.localStorage.offerImpressions = JSON.stringify(offerImpressions);
      dfd.resolve(data);
    });

    return dfd.promise;
  };

  this.createUserObj = function(user){
    var dfd = $q.defer();

    var userData = JSON.stringify(user);

    $http.post('http://178.62.124.228/api/v1/users', userData).success(function(data) {
      var usrObj = data;

      dfd.resolve(usrObj);
    });

    return dfd.promise;
  };

  this.validateUserObj = function(user){
    var dfd = $q.defer();

    var genertatedToken = AuthService.validateUserToken(user);

    var authData = {
      grant_type: 'client_credentials',
      client_id: 'PROMOAPP'
    };

    $http.post('http://178.62.124.228/api/v1/oauth/tokens',
    authData, {
      headers: {
        'Authorization': "Basic " + genertatedToken
      }
    }).success(function(data) {
      var authToken = data;

      dfd.resolve(authToken);
    });
    return dfd.promise;
  };

  this.getUserDetails = function(userId){
    var dfd = $q.defer();

    $http.get('database.json').success(function(database) {
      //find the user
      var user = (window.localStorage.PromoPay_user) ?
        JSON.parse(window.localStorage.PromoPay_user) : null;

      dfd.resolve(user);
    });

    return dfd.promise;
  };

  this.getUserPosts = function(userId){
    var dfd = $q.defer();

    $http.get('database.json').success(function(database) {

      //get user posts
      var userPosts =  _.filter(database.posts, function(post){ return post.userId == userId; });
      //sort posts by published date
      var sorted_posts = _.sortBy(userPosts, function(post){ return new Date(post.date); });

      //find the user
      var user = _.find(database.users, function(user){ return user._id == userId; });

      //add user data to posts
      var posts = _.each(sorted_posts.reverse(), function(post){
        post.user = user;
        return post;
      });

      dfd.resolve(posts);
    });

    return dfd.promise;
  };

  this.getUserLikes = function(userId){
    var dfd = $q.defer();

    $http.get('database.json').success(function(database) {
      //get user likes
      //we will get all the posts
      var slicedLikes = database.posts.slice(0, 4);
      // var sortedLikes =  _.sortBy(database.posts, function(post){ return new Date(post.date); });
      var sortedLikes =  _.sortBy(slicedLikes, function(post){ return new Date(post.date); });

      //add user data to posts
      var likes = _.each(sortedLikes.reverse(), function(post){
        post.user = _.find(database.users, function(user){ return user._id == post.userId; });
        return post;
      });

      dfd.resolve(likes);

    });

    return dfd.promise;

  };

  this.getFeed = function(page){

    var pageSize = 5, // set your page size, which is number of records per page
        skip = pageSize * (page-1),
        totalPosts = 1,
        totalPages = 1,
        dfd = $q.defer();

    $http.get('database.json').success(function(database) {

      totalPosts = database.posts.length;
      totalPages = totalPosts/pageSize;

      var sortedPosts =  _.sortBy(database.posts, function(post){ return new Date(post.date); }),
          postsToShow = sortedPosts.slice(skip, skip + pageSize);

      //add user data to posts
      var posts = _.each(postsToShow.reverse(), function(post){
        post.user = _.find(database.users, function(user){ return user._id == post.userId; });
        return post;
      });

      dfd.resolve({
        posts: posts,
        totalPages: totalPages
      });
    });

    return dfd.promise;
  };
})

.service('ShopService', function ($http, $q, _, AuthService){

  this.getProducts = function(offerImpressions) {
    var dfd = $q.defer();
    var products = offerImpressions;
    dfd.resolve(products);

    return dfd.promise;
  };

  this.getProduct = function(productId){
    var dfd = $q.defer();

    var offerImpressions = JSON.parse(window.localStorage.offerImpressions || '{}');

    angular.forEach(offerImpressions.data, function(value,index){
        if(value.id === productId) {
           var product = value;
           dfd.resolve(product);
        }
    });
    return dfd.promise;
  };

  this.addProductToCart = function(productToAdd){

    var cart_products = !_.isUndefined(window.localStorage.ionTheme1_cart) ? JSON.parse(window.localStorage.ionTheme1_cart) : [];
    //check if this product is already saved
    var existing_product = _.find(cart_products, function(product){ return product.id == productToAdd.id; });

    if(!existing_product && productToAdd.vchr === null){
      var genertatedToken = window.localStorage.access_token;
      console.log(genertatedToken);
      var user = AuthService.getLoggedUser();
      var url = 'http://178.62.124.228/api/v1/users/' + user._id + '/vouchers';
      var payLoad = {
        offerId: productToAdd.id
      };
      $http.post(url,
      payLoad, {
        headers: {
          'Authorization': "Bearer " + genertatedToken
        }
      }).success(function(response) {
        console.log(response);
        productToAdd.vchr = response.data;
      });
    }

    cart_products.push(productToAdd);
    window.localStorage.ionTheme1_cart = JSON.stringify(cart_products);

    return productToAdd;
  };

  this.getCartProducts = function(){
    return JSON.parse(window.localStorage.ionTheme1_cart || '[]');
  };

  this.removeProductFromCart = function(productToRemove){
    var cart_products = JSON.parse(window.localStorage.ionTheme1_cart);

    var new_cart_products = _.reject(cart_products, function(product){ return product.id == productToRemove.id; });

    window.localStorage.ionTheme1_cart = JSON.stringify(new_cart_products);
  };

})




;
