
## Swift and ARC

https://developer.apple.com/videos/play/wwdc2021/10216/

Object lifetime begins at initialisaition and ends at last use of the reference.
retain count is 1 on a initialized object, and does not require explicit retain.
A retain is inserted before a refernce assignment, and a release is inserted after last use. (contrast to deallocation on scope end like C++).

Relying on observed object lifetimes can cause bugs!

* Weak and unowned references in reference counting.
