https://www.youtube.com/watch?v=jfYWwQrtzzY

## My initial approach

we will have a bunch of draggable `li`s inside a `ul`, which we can drag around.
each li would be draggable, on drag hold over other li, we might want to move around items in the list,
on drop, DOM should have the new order of items.

## Improvements

Not just within the same ul/container, we should be able to drag and drop items into different containers than where we started. 
Think of a kanban board as well.

## Initial setup

**Rather than restricting it with ul/li for the purpose of this demo, we will keep divs as simple containers and div for cards as well.**

Have two columns/containers.
Each column contains many cards i.e. div elements.

We can move around items i.e. card divs in the same column/list, or between columns/containers/lists.

We will have buttons to add columns and cards so that this will be a dynamic thing.

## Repositioning shifting logic calculation

Since `dragover` is the event that continously fires before drop, and also gives use the x,y coordinates where the dragging over is being done, it is the right time to show the shifted elements before drop.

