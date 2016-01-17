angular.module('PromoPay.auth.controllers', [])


.controller('WelcomeCtrl', function($scope, $state, $ionicModal){
	// $scope.bgs = ["http://lorempixel.com/640/1136"];
	$scope.bgs = ["img/welcome-bg.jpeg"];

	$ionicModal.fromTemplateUrl('views/app/legal/privacy-policy.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.privacy_policy_modal = modal;
  });

	$ionicModal.fromTemplateUrl('views/app/legal/terms-of-service.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.terms_of_service_modal = modal;
  });

  $scope.showPrivacyPolicy = function() {
    $scope.privacy_policy_modal.show();
  };

	$scope.showTerms = function() {
    $scope.terms_of_service_modal.show();
  };
})

.controller('CreateAccountCtrl', function($scope, $state, $q, UserService, $ionicLoading, $cordovaOauth) {
	  // This is the success callback from the login method
	  var fbLoginSuccess = function(response) {
	    if (!response.authResponse){
	      fbLoginError("Cannot find the authResponse");
	      return;
	    }

    	var authResponse = response.authResponse;

	    getFacebookProfileInfo(authResponse)
	    .then(function(profileInfo) {
	      // For the purpose of this example I will store user data on local storage
	      UserService.setUser({
	        authResponse: authResponse,
					userID: profileInfo.id,
					name: profileInfo.name,
					email: profileInfo.email,
	        picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
	      });
	      $ionicLoading.hide();
	      $state.go('app.shop.home');
	    }, function(fail){
	      // Fail get profile info
	      console.log('profile info fail', fail);
	    });
	  };

	  // This is the fail callback from the login method
	  var fbLoginError = function(error){
	    console.log('fbLoginError', error);
	    $ionicLoading.hide();
	  };

	  // This method is to get the user profile info from the facebook api
	  var getFacebookProfileInfo = function (authResponse) {
	    var info = $q.defer();

	    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
	      function (response) {
					console.log(response);
	        info.resolve(response);
	      },
	      function (response) {
					console.log(response);
	        info.reject(response);
	      }
	    );
	    return info.promise;
	  };

	  //This method is executed when the user press the "Login with facebook" button
	  $scope.facebookSignIn = function() {
	    facebookConnectPlugin.getLoginStatus(function(success) {
	      if(success.status === 'connected') {
	        // The user is logged in and has authenticated your app, and response.authResponse supplies
	        // the user's ID, a valid access token, a signed request, and the time the access token
	        // and signed request each expire
	        console.log('getLoginStatus', success.status);

	    		// Check if we have our user saved
	    		var user = UserService.getUser('facebook');

	    		if(!user.userID) {
						getFacebookProfileInfo(success.authResponse)
						.then(function(profileInfo) {
							// For the purpose of this example I will store user data on local storage
							UserService.setUser({
								authResponse: success.authResponse,
								userID: profileInfo.id,
								name: profileInfo.name,
								email: profileInfo.email,
								picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
							});

							$state.go('app.shop.home');
						}, function(fail){
							// Fail get profile info
							console.log('profile info fail', fail);
						});
					} else {
						$state.go('app.shop.home');
					}
	      } else {
			  	console.log('getLoginStatus', success.status);
				$ionicLoading.show({
	          	template: 'Logging in...'
	        });
	        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
	      }
	    });
	  };

	  $scope.twitterSignIn = function() {
  		var api_key = "6LFdycFQbKGyZ7vBajFCk4Fc7"; //Enter your Consumer Key (API Key)
  		var api_secret = "i6YvYEc0oxS1yW6M0XEclZxdAJxFEji9hIIY36FJaDVH1wFPFM"; // Enter your Consumer Secret (API Secret)

		$cordovaOauth.twitter(api_key, api_secret).then(function(result) {
			console.log(result);
		}, function(error) {
			console.log(error);
		});
	};

})

.controller('WelcomeBackCtrl', function($scope, $state, $ionicModal){
	$scope.doLogIn = function(){
		console.log("doing log in");
		$state.go('app.shop');
	};

	$ionicModal.fromTemplateUrl('views/auth/forgot-password.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.forgot_password_modal = modal;
  });

  $scope.showForgotPassword = function() {
    $scope.forgot_password_modal.show();
  };

	$scope.requestNewPassword = function() {
    console.log("requesting new password");
  };

  // //Cleanup the modal when we're done with it!
  // $scope.$on('$destroy', function() {
  //   $scope.modal.remove();
  // });
  // // Execute action on hide modal
  // $scope.$on('modal.hidden', function() {
  //   // Execute action
  // });
  // // Execute action on remove modal
  // $scope.$on('modal.removed', function() {
  //   // Execute action
  // });
})

.controller('ForgotPasswordCtrl', function($scope){

})

;
