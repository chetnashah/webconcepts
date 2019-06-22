
Primary library to do Rx stuff with Java.

`RxAndroid` is addon library that provides with Android specific utils
like scheduler to schedule work on android main thread.

To work with `Retrofit` refer Retrofit RxJava adapter at 
`https://github.com/square/retrofit/tree/master/retrofit-adapters/rxjava2`.

### RxAndroid

`AndroidSchedulers` is a part of `RxAndroid`.

### Flowable

`Flowable` is typically used when an `Observable` is emitting huge amounts of data but the `Observer` is not able to handle this data emission. This is known as Back Pressure.

there is no concept of backpressure in `Observables` anymore, and no way to handle it. If you're designing a reactive sequence that will probably require explicit backpressure handling - then `Flowable` is your best choice.

