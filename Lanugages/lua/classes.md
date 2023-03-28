
Classes are implicitly declared as named records.

methods are defined as extension to records/classes.

```lua
Point = {x = 0, y = 0}

function Point:create (o)
  o.parent = self
  return o
end

function Point:move (p)
  self.x = self.x + p.x
  self.y = self.y + p.y
end


--
-- creating points
--
p1 = Point:create{x = 10, y = 20}
p2 = Point:create{x = 10}  -- y will be inherited until it is set

--
-- example of a method invocation
--
p1:move(p2)
```