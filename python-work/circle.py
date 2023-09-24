class Circle:
    def __init__(self, radius):
        self._radius = radius

    def _get_radius(self):
        print("getting radius")
        return self._radius

    def _set_radius(self, value):
        print("setting radius to ", value)
        self._radius = value

    def _del_radius(self):
        del self._radius

    # public api
    radius = property(
        fset=_set_radius,
        fget=_get_radius,
        fdel=_del_radius,
        doc="The radius property"
    )


# define instance
circle = Circle(213)
# use property
print(circle.radius)  # getting radius 213
circle.radius = 111  # setting radius to 111
print(circle.radius)  # getting radius 111
