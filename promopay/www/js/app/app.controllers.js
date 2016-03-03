angular.module('PromoPay.app.controllers', [])


.controller('AppCtrl', function($scope, AuthService, PostService, ShopService, $ionicLoading, $timeout, $state, $ionicHistory) {

    $scope.clearCoupons = function () {
      AuthService.getOauthToken().then(function(response) {
        $scope.oauthToken = response;

        PostService.getOfferImpressions($scope.oauthToken).then(function(response) {
          $scope.offerImpressions = response.data;

          ShopService.getProducts($scope.offerImpressions).then(function(products) {
            $scope.products = products;

            angular.forEach($scope.products, function(value,index){
              console.log(value);
                if(value.vchr !== null && value.vchr.spends.length > 0) {
                  array.splice(value, 1);
                }
            });
          });
        });
      });
    };


    $scope.logOut = function() {
      $ionicLoading.show({ template: '<ion-spinner icon="ios"></ion-spinner><p style="margin: 5px 0 0 0;">Logging Out</p>', duration: 3000 });
      $timeout(function () {
          $ionicLoading.hide();
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
          $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
          $state.go('dont-have-facebook');
          }, 30);
    };

})

.controller('ProfileCtrl', function($scope, AuthService, $stateParams, PostService, $ionicHistory, UserService, $ionicActionSheet, $state, $ionicLoading, $ionicScrollDelegate) {

  $scope.$on('$ionicView.afterEnter', function() {
    $ionicScrollDelegate.$getByHandle('profile-scroll').resize();
  });

  var loggedUser = AuthService.getLoggedUser();

  $scope.myProfile = loggedUser._id;
  // $scope.likes = [];
  $scope.user = {};

  PostService.getUserDetails(loggedUser._id).then(function(data){
    $scope.user = data;
  });

  // PostService.getUserLikes(loggedUser._id).then(function(data){
  //   $scope.likes = data;
  // });

  // $scope.getUserLikes = function(userId){
  //   //we need to do this in order to prevent the back to change
  //   $ionicHistory.currentView($ionicHistory.backView());
  //   $ionicHistory.nextViewOptions({ disableAnimate: true });
  //
  //   $state.go('app.profile.likes', {userId: userId});
  // };

  $scope.user = UserService.getUser();

	$scope.showLogOutMenu = function() {
		var hideSheet = $ionicActionSheet.show({
			destructiveText: 'Logout',
			titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
			cancelText: 'Cancel',
			cancel: function() {},
			buttonClicked: function(index) {
				return true;
			},
			destructiveButtonClicked: function(){
				$ionicLoading.show({
				  template: 'Logging out...'
				});

        // Facebook logout
        facebookConnectPlugin.logout(function(){
          $ionicLoading.hide();
          $state.go('welcome');
        },
        function(fail){
          $ionicLoading.hide();
        });
			}
		});
	};

})


.controller('ProductCtrl', function($scope, $stateParams, ShopService, $ionicPopup, $ionicLoading, $cordovaSocialSharing, PostService, AuthService) {
  $scope.products = [];
  var productId = $stateParams.productId;

  //Set the options for the barcode display
  var vm = this;
  vm.options = {
      width: 2,
      height: 100,
      quite: 10,
      displayValue: true,
      font: "monospace",
      textAlign: "center",
      fontSize: 12,
      backgroundColor: "",
      lineColor: "#000"
  };

  ShopService.getProduct(productId).then(function(product){
    $scope.product = product;
    if($scope.product.vchr !== null) {
      $scope.qrData = $scope.product.vchr.bcodes[2].b;
    }

    console.log($scope.product);
  });

  $scope.shareCoupon = function () {
      console.log('made it');
  };

  //Social Sharing For individual coupons
  $scope.shareViaTwitter = function(product) {
      var message = product.title;
      var image = product.picture;
      var link = product.description;
      $cordovaSocialSharing.share(message, image, link)
        .then(function(result) {
          console.log(result);
        }, function(err) {
          console.log(err);
        });
    };
})

.controller('ShopCtrl', function($scope, ShopService, $ionicFilterBar, $timeout, AuthService, PostService, $stateParams, $ionicLoading, $state, $ionicPopup) {

  $scope.products = [];
  $scope.listCanSwipe = true;
  var filterBarInstance;

  if(window.localStorage.offerImpressions !== 'undefined') {
    $ionicLoading.show({
      template: '<ion-spinner icon="ios"></ion-spinner><p style="margin: 5px 0 0 0;">Loading Offers</p>', duration: 3000
    });

    AuthService.getOauthToken().then(function(response) {
      $scope.oauthToken = response;

      PostService.getOfferImpressions($scope.oauthToken).then(function(response) {
        $scope.offerImpressions = response.data;

        ShopService.getProducts($scope.offerImpressions).then(function(products) {
          $scope.products = products;
          $ionicLoading.hide();

        });
      });
    });
  }

  $scope.doRefresh = function () {
    AuthService.getOauthToken().then(function(response) {
      $scope.oauthToken = response;

      PostService.getOfferImpressions($scope.oauthToken).then(function(response) {
        $scope.offerImpressions = response.data;

        ShopService.getProducts($scope.offerImpressions).then(function(products) {
          $scope.products = products;
          console.log($scope.products);
        });
      });
    });
  };

  $scope.showFilterBar = function () {
       filterBarInstance = $ionicFilterBar.show({
         items: $scope.products,
         update: function (filteredItems) {
           $scope.products = filteredItems;
         },
         filterProperties: 'id'
       });
     };

     // show add to selected coupons popup on button click
     $scope.showAddToCartPopup = function(product) {
       $scope.data = {};
       $scope.data.product = product;
       $scope.data.productOption = 1;
       $scope.data.productQuantity = 1;

       var myPopup = $ionicPopup.show({
         cssClass: 'add-to-cart-popup',
         templateUrl: 'views/app/shop/partials/add-to-cart-popup.html',
         title: 'Create This Voucher',
         scope: $scope,
         buttons: [
           { text: '', type: 'close-popup ion-ios-close-outline' },
           {
             text: 'Create This Voucher',
             onTap: function(e) {
               return $scope.data;
             }
           }
         ]
       });
       myPopup.then(function(res) {
         if(res)
         {
           $ionicLoading.show({ template: '<ion-spinner icon="ios"></ion-spinner><p style="margin: 5px 0 0 0;">Adding to selected coupons</p>', duration: 1000 });
           $scope.data.product = ShopService.addProductToCart(res.product);
           console.log('Item added to selected coupons!', res);

           var skipCache = true;

           AuthService.getOauthToken(skipCache).then(function(response) {
             $scope.oauthToken = response;

             PostService.getOfferImpressions($scope.oauthToken, skipCache).then(function(response) {
               $scope.offerImpressions = response.data;

               ShopService.getProducts($scope.offerImpressions).then(function(products) {
                 $scope.products = products;
                 $scope.qrData = $scope.data.product.vchr.bcodes[2].b;
                 console.log($scope.products);
               });
             });
           });
         }
         else {
           console.log('Popup closed');
         }
       });
     };

    $scope.removeVoucher = function (product) {
      // product.removed =  true;
      $scope.product = product;
      console.log($scope.product);
    };
})


.controller('ShoppingCartCtrl', function($scope, ShopService, $ionicActionSheet, _) {
  $scope.products = ShopService.getCartProducts();

  $scope.removeProductFromCart = function(product) {
    $ionicActionSheet.show({
      destructiveText: 'Remove From Selected Coupons',
      cancelText: 'Cancel',
      cancel: function() {
        return true;
      },
      destructiveButtonClicked: function() {
        ShopService.removeProductFromCart(product);
        $scope.products = ShopService.getCartProducts();
        return true;
      }
    });
  };

  $scope.getSubtotal = function() {
    return _.reduce($scope.products, function(memo, product){ return memo + product.offer.val; }, 0);
  };

})


.controller('CheckoutCtrl', function($scope) {
  //$scope.paymentDetails;
})

.controller('SettingsCtrl', function($scope, $ionicModal) {

  $ionicModal.fromTemplateUrl('views/app/legal/terms-of-service.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.terms_of_service_modal = modal;
  });

  $ionicModal.fromTemplateUrl('views/app/legal/privacy-policy.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.privacy_policy_modal = modal;
  });

  $scope.showTerms = function() {
    $scope.terms_of_service_modal.show();
  };

  $scope.showPrivacyPolicy = function() {
    $scope.privacy_policy_modal.show();
  };

})



;
