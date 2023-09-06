
https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreAnimation_guide/CoreAnimationBasics/CoreAnimationBasics.html#//apple_ref/doc/uid/TP40004514-CH2-SW3

##

It is an infrastructure for compositing and manipulating your app’s content in hardware. 

**At the heart of this infrastructure are layer objects, which you use to manage and manipulate your content appearance**

A layer captures your content into a bitmap that can be manipulated easily by the graphics hardware.

## Layers

Unlike views, layers do not define their own appearance. A layer merely manages the state information surrounding a bitmap. 

a layer captures the content your app provides and caches it in a bitmap, which is sometimes referred to as the backing store.

When you subsequently change a property of the layer, all you are doing is changing the state information associated with the layer object.

### Layers have their own background and border

 A layer can display a filled background and a stroked border in addition to its image-based contents. The background color is rendered behind the layer’s contents image and the border is rendered on top of that image

```objc 
myLayer.backgroundColor = [NSColor greenColor].CGColor;
myLayer.borderColor = [NSColor blackColor].CGColor;
myLayer.borderWidth = 3.0;
```

### layer supports corner radius
You can create a rounded rectangle effect for your layer by adding a corner radius to it. 

### CALayer - 

An object that manages image-based content and allows you to perform animations on that content.

`layer.contents` - An object that provides the contents of the layer. Animatable.

`layer.draw(in: cgcontext)` - Draws the layer’s content using the specified graphics context.

`layer.layoutManager` - The object responsible for laying out the layer’s sublayers.

### layer backed view

When you enable layer support for a view, you create what is referred to as a layer-backed view. In a layer-backed view, the system is responsible for creating the underlying layer object and for keeping that layer in sync with the view. All iOS views are layer-backed and most views in OS X are as well.

`note:` For layer-backed views, it is recommended that you manipulate the view, rather than its layer, whenever possible. In iOS, views are just a thin wrapper around layer objects, so any manipulations you make to the layer usually work just fine. But there are cases in both iOS and OS X where manipulating the layer instead of the view might not yield the desired results