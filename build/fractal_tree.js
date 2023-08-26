var WIDTH = 700;
var HEIGHT = 700;
var setupCanvas = function () {
    var canvas = document.getElementById("drawBoard");
    var ctx = canvas.getContext("2d");
    return ctx;
};
//Translate polar to cartesian. R is len and ang is angle.
var polarToCartesian = function (r, ang) {
    return { x: (r * Math.sin(ang)), y: (r * Math.cos(ang)) };
};
/**
 * We calculate the next vertex coordinates in polar and translate them into cartesian
 * then we draw the branch
*/
var drawBranch = function (from, state, sigma, length, iterations, limit, context) {
    var endTrans = polarToCartesian(length, sigma);
    var end = { x: from.x + endTrans.x, y: from.y + endTrans.y };
    console.log("Started working on branch: " + from.x + ", " + from.y + ", to: " + end.x + ", " + end.y);
    iterations += 1;
    context.moveTo(from.x, from.y);
    context.lineTo(end.x, end.y);
    if (iterations < limit) {
        //Recursive call for the left and right branches of the tree to come
        drawBranch(end, state, (sigma + state.theta / 2) % 360, length * state.ratio, iterations, limit, context);
        drawBranch(end, state, (sigma - state.theta / 2) % 360, length * state.ratio, iterations, limit, context);
    }
    return;
};
var drawTree = function () {
    console.log("Started drawing tree.");
    var context = setupCanvas();
    var startCoord = { x: WIDTH / 2, y: HEIGHT };
    var treeState = { ratio: 0.5, theta: 30 };
    context.beginPath();
    drawBranch(startCoord, treeState, 90, 300, 0, 4, context);
    context.stroke();
};
document.getElementById("drawButton").addEventListener("click", function () { return drawTree(); });
