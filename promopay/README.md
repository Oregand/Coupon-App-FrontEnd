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
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Gulp] - the streaming build system
* [jQuery/JS] - duh

### Installation(Android For Now)

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


### Plugins

PromoPay is currently extended with the following plugins

* Facebook
* Github
* Google Plus
* Twitter

Readmes, how to use them in your own application can be found here:

* [plugins/dropbox/README.md] [PlDb]
* [plugins/github/README.md] [PlGh]
* [plugins/googledrive/README.md] [PlGd]
* [plugins/onedrive/README.md] [PlOd]

### Development

Want to contribute? Great!

But seriously, don't even think about it.

### Docker, N|Solid and NGINX

More details coming soon.

### Todos

 - Alot!

### Color Palette

PromoPay color palette: http://paletton.com/#uid=7000u0kiCFn8GVde7NVmtwSqXtg

License
----

Copyright - @David O'Regan 2016


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [@thomasfuchs]: <http://twitter.com/thomasfuchs>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [marked]: <https://github.com/chjj/marked>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [keymaster.js]: <https://github.com/madrobby/keymaster>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]:  <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
