const WIDTH : number = 700;
const HEIGHT : number= 700;

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

const setupCanvas = () => {
    const canvas : any= document.getElementById("drawBoard");
    const ctx : any= canvas.getContext("2d");
    return ctx; 
}

//Translate polar to cartesian. R is len and ang is angle.
const polarToCartesian = (r : number, ang : number) => {
    return {x : (r * Math.sin(ang)), y : (r*Math.cos(ang))}
}

/** 
 * We calculate the next vertex coordinates in polar and translate them into cartesian
 * then we draw the branch
*/
const drawBranch = (from : Coord, state : TreeState, sigma : number, length : number, iterations : number, limit : number, context : any) => {
    let endTrans : Coord = polarToCartesian(length, sigma);

    let end : Coord = {x : from.x + endTrans.x, y : from.y + endTrans.y};
    console.log("Started working on branch: " + from.x + ", " + from.y + ", to: " + end.x + ", " + end.y);
    
    iterations += 1;

    context.moveTo(from.x, from.y);
    context.lineTo(end.x, end.y);
    
    if (iterations < limit){
        //Recursive call for the left and right branches of the tree to come
        drawBranch(end, state, (sigma + state.theta/2) % 360, length * state.ratio, iterations, limit, context);
        drawBranch(end, state, (sigma - state.theta/2) % 360, length * state.ratio, iterations, limit, context);
    }
    return;
}

const drawTree = () => {
    console.log("Started drawing tree.");
    const context : any = setupCanvas();
    let startCoord : Coord = { x : WIDTH/2, y : HEIGHT};
    const treeState : TreeState = {ratio : 0.5, theta : 30};
    context.beginPath();
    drawBranch(startCoord, treeState, 90, 300, 0, 4, context);
    context.stroke();
}

document.getElementById("drawButton").addEventListener("click", () => drawTree());