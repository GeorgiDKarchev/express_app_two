module.exports = function (req, res, next) {
    console.log("This is the middleware");
    next();
}