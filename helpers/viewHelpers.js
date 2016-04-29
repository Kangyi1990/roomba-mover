/**
 * Created by dufl on 4/28/2016.
 */
var helpers = {
    json: function(context) {
        return JSON.stringify(context, null, 2);
    },
    ifCond: function(v1, v2, options) {
        if (v1.toString() === v2.toString()) {
            return options.fn(this);
        }
        return options.inverse(this)
    }
};

module.exports=helpers;