#### - Image Wall -
SPA loading wall of images using API from Flickr, with Angular 1.6, and Bootstrap 4/flexbox.
Showing 2 centered boxes on the page, when resizing the browser.


######Repo


###### Instalation
 - you need Bower/& Npm installed globally, then just:
```
#!python

$/ npm install
```

***
###### Start the App

```
#!python

 $/ npm start
```

***
##### Stack/Setup
* Angular 1.6/component, BootStrap4 alpha.6/Flexbox, Sass, Typescript
* Bower files are installed in the ./public dir.
* Integraded in modular fashion
* Using mock data as service
* Coded in OOP
***


##### File structure

> **app**

>> scripts

>>> services

>>>> mock.data.ts

>>> directives

>>>> app.image.ts

>>> layout

>>>> app.layout.ts

>>>> app.layout.html

>> **app.core.ts**

>> **app.ts**

>> images

>> scss

>>> _preloader.scss

>>> cog09.svg

>>> global.variables.scss

>>> layout.scss

>>> _mixins.scss

>>> main.scss

> **index.html**

```
#!python

     /**
       *  The hierarchy of this app is:
       *  Layout  <<< API
       *     > myimage  <<< API
       *       
       */
```

***

##### -- Remarks --
- Auto ajusting the center of 2 boxes when scaling the window.
- Loading 250 small images from Flickr API.
- If the API KEY expires, please inform me and i will supply new one.
- Validation messages on API ERROR.
- Integraded preloader to wait until images are loaded, and then the centering can be properly aligned.
***

###### To be completed ?
The 2 boxes do not center on the mobile size.
***

##### Thank you