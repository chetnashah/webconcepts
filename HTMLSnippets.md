
For all available snippets refer snippets.json in emmet repo

### Use Emmet for quickly typing in html

Emmet is an editor plugin that lets you quickly write html with tab based expansion. e.g.
```html
<!-- div.myclass or myclass -->
<div class="myclass"></div>

<!--  #myid.myclass -->
<div id="myid" class="myclass"></div>

<!-- h1{Great Title} -->
<h1>Great Title</h1>

<!-- h1.gcs{Another subtitle} -->
<h1 class="gcs">Another subtitle</h1>

<!-- NESTING using angle brackets -->
<!-- div>ul>li*4 -->
<div>
    <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</div>

<!-- div>ul#navigation>li*3>{List Item 1} -->
<div>
    <ul id="navigation">
        <li>List Item 1</li>
        <li>List Item 1</li>
        <li>List Item 1</li>
    </ul>
</div>

<!-- multiplication with indexes -->
<!-- ul#navigation>li*4>{My title $} -->
<ul id="navigation">
    <li>My title 1</li>
    <li>My title 2</li>
    <li>My title 3</li>
    <li>My title 4</li>
</ul>

<!-- SIBLINGS via +, siblings are elements at same level -->
<!-- html>head+body>p -->
<html>
<head></head>
<body>
    <p></p>
</body>
</html>

<!-- GROUPING via parentheses () -->
<!-- html>(head>title)+(body>p) -->
<html>
<head>
    <title></title>
</head>
<body>
    <p></p>
</body>
</html>

<!-- EXTENDED structure -->
<!-- select+ -->
<!-- https://github.com/emmetio/html-matcher/issues/1 -->


<!-- Very useful init -->
<!-- ! -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    
</body>
</html>

```

### Snippets for css

```css
div {
    /* pd10 */
    padding: 10px;
    /* m20 */
    margin: 20px;
    /* h20 */
    height: 20px;
    /* w10 */
    width: 10px;
}
```

#### Making custom snippets is also useful

