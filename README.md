# PromoPay

PromoPay is a cloud-enabled, mobile-ready, AngularJS powered Coupon Validation application.

  - Download Application
  - Register
  - Get Coupons
  - Scan Coupons
  - Magic

### Version
0.0.4

### Tech

PromoPay uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [SASS] - Syntactically Awesome Style Sheets
* [npm] - a super fast package manager for Node dependancies
* [node.js] - evented I/O for the backend
* [Gulp] - the streaming build system
* [jQuery/JS] - duh

### Installation(Android && IOS)

#### Android

You need Gulp installed globally:

1. Download Application & CD Into Application Folder

```sh
$ git clone git@github.com:Oregand/Coupon-App-FrontEnd.git
$ cd Coupon-App-FrontEnd/promopay/
```

2. Ensure you have a valid version of the Android SDK build tools(Version - 22)

```sh
http://developer.android.com/sdk/index.html
```

3. Get ionic

```sh
$ npm install -g cordova ionic
```

4. Connect Device Via USB & Enable Debug Mode

```sh
$ Settings -> Developer Options -> Enable Debug Mode
```

5. Run Android build

```sh
$ ionic run android
```

#### IOS


1. Download Application & CD Into Application Folder

```sh
$ git clone git@github.com:Oregand/Coupon-App-FrontEnd.git
$ cd Coupon-App-FrontEnd/promopay/
```

2. Ensure you have a valid version of Xcode

```sh
https://developer.apple.com/xcode/
```

3. Get ionic

```sh
$ npm install -g cordova ionic
```

4. Connect Device Via USB & Enable Debug Mode

```sh
$ Settings -> Developer Options -> Enable Debug Mode
```

5. Run IOS Build

```sh
$ ionic build ios
```

6. Deploy to device with Xcode

### Plugins

PromoPay is currently extended with the following plugins

* Angular Barcode
* Cordova Social Sharing
* Ionic Search Bar

### Development

Want to contribute? Great!

But seriously, don't even think about it.


### Project Structure
Ionic apps are built with Cordova. Cordova is a means of packaging html/css/js into apps that can run on mobile and desktop devices and provides a plugin architecture for accessing native functionality beyond the reach of JS run from a web browser. As such, Ionic apps have the Cordova file structure.

Once you download the project, you will find the following files structure:

#### hooks:

Is for custom actions to be taken as your app moves through the Cordova development process. It may be useful for larger projects that require automated processes to run and source code modification but will normally be unused.

#### plugins:

Are where Cordova stores the plugins that you add to your project. Plugins are added by the command: ionic plugin add {plugin}  *where {plugin} is the plugin’s ID or github URL.

#### scss:
Is for your app’s SASS file.

#### ionic.app.scss:
Is the root file. It contains all the includes needed for the project.
we organized the Sass files according to the app components for example: auth, feed, shop, etc. Each folder has at least one .styles.scss file where you will find all the styles related to that component and one .variables.scss where you will find all variables defined for that component. You are welcome to change those variables values to customize your app design.

#### www:
Is where your app is developed and where you’ll spend most of your time when building an Ionic app.

#### css:
Contains either your app’s specific CSS file, or your SCSS generated output file, should you use it, along with any other CSS files you wish to add. CSS is added to your project by a <link> tag in your index.html

#### img:
Images.

#### js:
All the javascript code such as controllers, directives, routing and services.

#### lib:
Is where Ionic and any other libraries you use can be placed. It follows the Bower formatting, and new libs can be added and updated using Bower.

#### views:
Is where your view files go. Your project does have a main index.html file in the WWW directory, but your app likely contains many template views that are added dynamically. Unlike your CSS and JS files, views files do not need to be mentioned in your index.html file. You define them in your $state definition, and UI Router and Ionic will take care of the rest, including pre-loading the template file. These files are Angular templates and are parsed before being added to the DOM.
We organized the view files according to the app components for example: auth, feed, shop, etc.

#### package.json:
Your node dependencies of the project that are available on npm. If someone runs npm install in the root directory of your project, it will install all the dependencies into a folder named:  ./node_modules.

#### bower.json:
Your frontend dependencies of the project available on bower. If someone runs bower install in the root directory of your project, it will install all the packages listed on this file.

#### gulpfile.js:  
This file contains the instructions for what you want Gulp to do.


### Set Up

First you will need to have Ionic installed in your environment. Please refer to the Ionic offical installation documentation in order to install Ionic and cordova:

```sh
$ http://ionicframework.com/docs/guide/installation.html
```

1. Run npm install in order to install all the node modules required by the app.

2. Run bower install in order to install all the javascript libraries required by the app.

3. This project uses Sass so make sure you setup your project to use Sass by running ionic setup sass.

4. To test the app please refer to this guide: http://ionicframework.com/docs/guide/testing.html


Note: If you are experiencing that your app doesn’t refresh automatically when you update your html views, that’s probably because we are using angular templatecache to preprocess all the views in the app which improve performance dramatically. Also see gulp-angular-templatecache.

Let us explain this a little bit. If we choose to follow the “default” angular/ionic approach we would have each of our views loaded with a particular AJAX request. If we have many views, this will cause many AJAX request slowing down the app needlessly. The alternative we use is using angular templatecache  which concatenates all the views html into one javascript file that loads those views to angular avoiding multiple AJAX requests. With this approach we just need to make one request to that javascript file (named app.views.js).
We use gulp tasks that do this automatically, so when you change your html in your text editor gulp will re-create this app.views.js file and all will be ok.

The problem may occur when you don’t have gulp running and you are changing your html, in this case gulp won’t be able to re-create app.views.js file so you won’t see your html updates in your app.
You can fix this by turning on gulp (by running ionic serve) or by removing the dependencies to app.views.js file and PromoPay.app.views module in your app.js (this will cause you to follow the angular default approach).



### Color Palette

PromoPay color palette: http://paletton.com/#uid=7000u0kiCFn8GVde7NVmtwSqXtg

License
----

Copyright - @David O'Regan 2016


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [node.js]: <http://nodejs.org>
   [jQuery]: <http://jquery.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>
