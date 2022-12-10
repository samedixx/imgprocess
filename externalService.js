const request = require("request-promise");

module.exports = async function (options) {
    try {
        let default_options = {
            timeout: 1500
        };
        options = {...options, ...default_options};
        return request(options);
    } catch (err) {
        //console.error(err);
        return {"statusCode": err.statusCode, "error": err.error};
    }
}