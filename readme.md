# Fractal tree generator
This mini project is a fractal canopy generator written in TypeScript.

## About fractal trees
Fractal tree is a type of fractal, created by splitting line segments into smaller segments at their ends. Trough the process, we decrease their length by a constant and keep the same angle between them. You can read more about them on [Wikipedia](https://en.wikipedia.org/wiki/Fractal_canopy).

## Implementation
This algorithm implements fractal canopies in a recursive way. Our center is the *drawBranch* procedure which draws the current tree branch and then calls itself two times at its end to create the following ones. The whole recursion process is stopped at certain number of iterations. 

## Interface
You can edit:
- **Iterations:** Number of recursive calls made. Be carefull with it, since the recursive problem difficulty rises exponentially.
- **Ratio:** Determines the length of the next line as: *len* * *ratio* = *nextLen*.
- **Angle:** Is the angle between the each pair of branches in radians. *Angle = 1* means that the angle between the branches will be *1 * PI rad* = *180 deg*.
- **Initial branch length:** Tells us the length of the first branch of the tree (which is orthogonal to the x-axis).

