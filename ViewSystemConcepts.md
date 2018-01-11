
### ScrollViews

Scrollviews are typically used when, there is more content to show but not enough space. so user can use a gesture to change contents of the viewport by sliding content off the screen within the scrollview.

Scrollviews usually have three properties,
1. length of content: This can extend the visible boundaries.
This is known as scrollHeight in web, computeScrollRange() on Android
and contentSize in ios.
2. size of scrollView: This is visually visible (the clipped area).
This is known as clientHeight in web, getHeight() on scrollview in Android,
and contentHeight in ios.
3. how much length is already scrolled. Tells us how much we have already visited in scrollview.
This is known as scrollY/?? in web, mScrollY/getScrollY() in Android,
and contentOffset in ios.

