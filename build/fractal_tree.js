var WIDTH = 700;
var HEIGHT = 700;
var ratio = 0.75;
var iterations = 6;
//Initial value approx. 2*PI / 11
var angle = 0.571198664;
var branchSize = 200;
var setupCanvas = function () {
    var canvas = document.getElementById("drawBoard");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    return ctx;
};
//Because we have the polar angle in (PI-sigma)rad form, our classic formula of 
//polar to cart is changed a bit
var polarToCartesian = function (r, ang) {
    return { x: (r * Math.sin(ang)), y: (r * Math.cos(ang)) };
};
/**
 * We calculate the next vertex coordinates in polar and translate them into cartesian
 * then we draw the branch and call this function to next two branches
*/
var drawBranch = function (from, state, sigma, length, iterations, limit, context) {
    //Vector of transformation of the original start point to get the end point
    console.log("Iteration" + iterations + " Length: " + length);
    var transformVector = polarToCartesian(length, sigma);
    var end = { x: from.x + transformVector.x, y: from.y + transformVector.y };
    //console.log("Started working on branch: " + from.x + ", " + from.y + ", to: " + end.x + ", " + end.y);
    iterations += 1;
    context.beginPath();
    context.lineWidth = Math.max(length / 13, 1);
    context.moveTo(from.x, from.y);
    context.lineTo(end.x, end.y);
    context.stroke();
    if (iterations < limit) {
        //Recursive call for the left and right branches of the tree to come
        //We move the next angle * the constant angle/2 to both sides for branch rotation
        //We shorten the next branch by the ratio
        drawBranch(end, state, (sigma + state.theta / 2) % (2 * Math.PI), length * state.ratio, iterations, limit, context);
        drawBranch(end, state, (sigma - state.theta / 2) % (2 * Math.PI), length * state.ratio, iterations, limit, context);
    }
    return;
};
var drawTree = function () {
    console.log("Started drawing tree.");
    var context = setupCanvas();
    //We start at the bottom-middle of the screen
    var startCoord = { x: WIDTH / 2, y: HEIGHT };
    //State of the tree transformation
    var treeState = { ratio: ratio, theta: angle };
    drawBranch(startCoord, treeState, Math.PI, branchSize, 0, iterations, context);
};
document.getElementById("drawButton").addEventListener("click", function () { return drawTree(); });
document.getElementById("iterCount").addEventListener("input", function (ev) {
    iterations = parseInt(ev.target.value);
});
document.getElementById("ratioInput").addEventListener("input", function (ev) {
    ratio = parseFloat(ev.target.value);
});
document.getElementById("angleInput").addEventListener("input", function (ev) {
    angle = parseFloat(ev.target.value);
});
document.getElementById("branchSize").addEventListener("input", function (ev) {
    branchSize = parseInt(ev.target.value);
});
