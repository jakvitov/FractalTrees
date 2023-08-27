let sideSize : number = 700;
let ratio : number = 0.75;
let iterations : number = 6;
//Initial value approx. 2*PI / 11
let angle : number = 0.571198664;
let branchSize : number = 150;

/**
 * We solve the fractal tree problem by recursive way of drawing the branches and transforming the angle and length of them.
 * We make use of the polar coordinates system to manage the angles and lengths of the next branches.
 */

interface Coord {
    x : number;
    y : number;
}   

interface TreeState {
    //Ratio of decrease of branch length - len * ratio = newLen
    ratio : number;
    //Angle between two new branches
    theta : number;
}

const setupCanvas = () : any => {
    const canvas : any= document.getElementById("drawBoard");
    const ctx : any= canvas.getContext("2d");
    ctx.clearRect(0, 0, sideSize, sideSize);
    return ctx; 
}

//Because we have the polar angle in (PI-sigma)rad form, our classic formula of 
//polar to cart is changed a bit
const polarToCartesian = (r : number, ang : number) : Coord => {
    return {x : (r * Math.sin(ang)), y : (r*Math.cos(ang))}
}

/** 
 * We calculate the next vertex coordinates in polar and translate them into cartesian
 * then we draw the branch and call this function to next two branches
*/
const drawBranch = (from : Coord, state : TreeState, sigma : number, length : number, iterations : number, limit : number, context : any) : void => {
    //Vector of transformation of the original start point to get the end point
    console.log("Iteration" + iterations + " Length: " + length)
    let transformVector : Coord = polarToCartesian(length, sigma);
    let end : Coord = {x : from.x + transformVector.x, y : from.y + transformVector.y};
    
    //console.log("Started working on branch: " + from.x + ", " + from.y + ", to: " + end.x + ", " + end.y);
    
    iterations += 1;

    context.beginPath();
    context.lineWidth = Math.max(length / 13, 1);
    context.moveTo(from.x, from.y);
    context.lineTo(end.x, end.y);
    context.stroke();
    
    if (iterations < limit){
        //Recursive call for the left and right branches of the tree to come
        //We move the next angle * the constant angle/2 to both sides for branch rotation
        //We shorten the next branch by the ratio
        drawBranch(end, state, (sigma + state.theta/2) % (2 * Math.PI), length * state.ratio, iterations, limit, context);
        drawBranch(end, state, (sigma - state.theta/2) % (2 * Math.PI), length * state.ratio, iterations, limit, context);
    }
    return;
}

const drawTree = () : void => {
    console.log("Started drawing tree.");
    const context : any = setupCanvas();
    //We start at the bottom-middle of the screen
    let startCoord : Coord = { x : sideSize/2, y : sideSize};
    
    //State of the tree transformation
    const treeState : TreeState = {ratio : ratio, theta : angle};
    
    drawBranch(startCoord, treeState, Math.PI, branchSize, 0, iterations, context);
}

document.getElementById("drawButton").addEventListener("click", () => drawTree());
document.getElementById("iterCount").addEventListener("input", (ev) => {
    iterations = parseInt((ev.target as HTMLInputElement).value);
})
document.getElementById("ratioInput").addEventListener("input", (ev) => {
    ratio = parseFloat((ev.target as HTMLInputElement).value);
})

document.getElementById("angleInput").addEventListener("input", (ev) => {
    angle = parseFloat((ev.target as HTMLInputElement).value);

})

document.getElementById("branchSize").addEventListener("input", (ev) => {
    branchSize = parseInt((ev.target as HTMLInputElement).value);
})

document.getElementById("canvasSize").addEventListener("input", (ev) => {
    sideSize = parseInt((ev.target as HTMLInputElement).value);
    document.getElementById("drawBoard").setAttribute("height", sideSize.toString());
    document.getElementById("drawBoard").setAttribute("width", sideSize.toString());
})