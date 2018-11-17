
// can write plugin in es6 as long as we ship an es5 version
class MyExampleWebpackPlugin {
    constructor(){
        console.log('MyExampleWebpackPlugin constructor!');
    }
    apply(compiler) {
        // specify event hook to attach to
        // via compiler.hooks.hookName.tap
        compiler.hooks.emit.tapAsync(
            'MyExampleWebpackPlugin',
            (compilation, callback) => {
                console.log('This is example plugin');
                //console.log('here is compliation object that represents single build of assets: ', compilation);

                // manipulate build using pluginAPI provided by webpack

                callback();
            }
        );

        compiler.hooks.done.tap('helloworld', (stats) => {
            console.log('Plugin done event, stats = ', stats);
        });


    }
}

module.exports = MyExampleWebpackPlugin;
