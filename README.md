# easy-popup

A very small widget for simple popups based on HTML data-* attributes.

## Usage

Include both the CSS and the JS.

```html
<link rel="stylesheet" href="easypopups.css">
<script src="easypopups.js"></script>
```

Create a trigger element (any element will work).
Give that element a data-ptarget attribut and give it some identifier you like. 
In this example we're using *info* as the identifier.

```html
<button data-ptarget="info">Trigger</button>
```

Then create a div that will be whats opened by the trigger. 
The div must atleast have the data-popup attribut.
It is possible to use a template for the popup, by name.
Possible templates are: 

- simple
- info

When you use a template you can additionally define a title for the popup
with the data-ptitle attribute.

In the following you can see an example of a possible template 
using all 3 attributes.

```html
<div data-popup="info" data-ptype="simple" data-ptitle="Custom title">
    Your popup content here.
</div>
```

Place your own markup instead of *Your popup content here.*.
Thats it. Now if you click on the trigger, the following popup will open.

![Popup](https://image.prntscr.com/image/K_NeLxyORxCyGxZoLt_vFg.png)


