# Sencha Loading Indicator

Thanks to Ionic's generous license, the same loading indicators available to you in the Ionic framework is now available to Sencha users.

[Demo - Sencha Fiddle](https://fiddle.sencha.com/#fiddle/rp5)

## Installation:

- Copy LoadingIndicator.js to app/ux/LoadingIndicator.js
- Add Ext.ux to your Ext.Loader.setPath() if it isn't already there, like so:

```
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'Ext.ux': 'app/ux',
});
```

- Add the contents of styles.css to your app.scss 
- Don't forget to recompile your SASS if it doesn't do it automagically.

## Usage: 

- Declare an xtype of 'LoadingIndicator' (or 'Loader') the way you would with any other xtype.

```
  xtype: 'LoadingIndicator'
```

- Available loading indicators are as follows: 
	- ios
	- android
	- bubbles
	- circles
	- crescent
	- dots
	- lines
	- ripple
	- spiral

- Like this:
```
	Ext.Viewport.mask({
        xtype: 'LoadingIndicator',
        message: 'Loading!'
    });
```

- This will default to the Android loader if on android, and iOS for iOS (and everything else)

- If you want to specify a different one, use this:

```
	Ext.Viewport.mask({
        xtype: 'LoadingIndicator',
        message: 'Loading!',
        name: 'bubbles'
    });
```

- This is also loosely based on the xtype 'loadmask', so it has the same properties and helper functions like:
	- message
	- cls
	- messageCls (which you can add .message-flash to)

- Since it extends the xtype 'mask', you can also use such convenience functions as
	- Ext.Viewport.mask();
	- Ext.Viewport.unmask();
	
## Notes
- Free beer to anyone who makes this better, easier to install, more performant, or more universally adapted.
