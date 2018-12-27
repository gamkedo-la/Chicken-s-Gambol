// Shamelessly copied from http://buildnewgames.com/astar/
// and adjusted for Chicken's Gambol


// world is a 2d array of integers (eg world[10][15] = 0)
// pathStart and pathEnd are arrays like [5,10]
function findPath(worldWidth, worldHeight, pathStart, pathEnd) {
  // keep track of the world dimensions
  // Note that this A-star implementation expects the world array to be square:
  // it must have equal height and width. If your game world is rectangular,
  // just fill the array with dummy values to pad the empty space.
  let worldSize = worldWidth * worldHeight;

  let distanceFunction = euclideanDistance;
  let findNeighbours = diagonalNeighbours;

  /*
    // alternate heuristics, depending on your game:

    // diagonals allowed but no squeezing through cracks:
    let distanceFunction = diagonalDistance;
    let findNeighbours = diagonalNeighbours;

    // diagonals and squeezing through cracks allowed:
    let distanceFunction = diagonalDistance;
    let findNeighbours = diagonalNeighboursFree;

    // euclidean but no squeezing through cracks:
    let distanceFunction = euclideanDistance;
    let findNeighbours = diagonalNeighbours;

    // euclidean and squeezing through cracks allowed:
    let distanceFunction = euclideanDistance;
    let findNeighbours = diagonalNeighboursFree;
  */

  // distanceFunction functions
  // these return how far away a point is to another

  function manhattanDistance(Point, Goal) {	// linear movement - no diagonals - just cardinal directions (NSEW)
    return Math.abs(Point.x - Goal.x) + Math.abs(Point.y - Goal.y);
  }

  function diagonalDistance(Point, Goal) {	// diagonal movement - assumes diag dist is 1, same as cardinals
    return Math.max(Math.abs(Point.x - Goal.x), Math.abs(Point.y - Goal.y));
  }

  function euclideanDistance(Point, Goal) {	// diagonals are considered a little farther than cardinal directions
    // diagonal movement using Euclide (AC = Math.sqrt(AB^2 + BC^2))
    // where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
    return Math.sqrt(Math.pow(Point.x - Goal.x, 2) + Math.pow(Point.y - Goal.y, 2));
  }

  // Neighbours functions, used by findNeighbours function
  // to locate adjacent available cells that aren't blocked

  // Returns every available North, South, East or West
  // cell that is empty. No diagonals,
  // unless distanceFunction function is not Manhattan
  function neighbours(x, y) {
    let N = y - 1,
      S = y + 1,
      E = x + 1,
      W = x - 1,
      myN = N > -1 && canWalkHere(x, N),
      myS = S < worldHeight && canWalkHere(x, S),
      myE = E < worldWidth && canWalkHere(E, y),
      myW = W > -1 && canWalkHere(W, y),
      result = [];
    if (myN) {
      result.push({ x: x, y: N });
    }
    if (myE) {
      result.push({ x: E, y: y });
    }
    if (myS) {
      result.push({ x: x, y: S });
    }
    if (myW) {
      result.push({ x: W, y: y });
    }
    findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
    return result;
  }

  // returns every available North East, South East,
  // South West or North West cell - no squeezing through
  // "cracks" between two diagonals
  function diagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result) {
    if (myN) {
      if (myE && canWalkHere(E, N)) {
        result.push({ x: E, y: N });
      }
      if (myW && canWalkHere(W, N)) {
        result.push({ x: W, y: N });
      }
    }
    if (myS) {
      if (myE && canWalkHere(E, S)) {
        result.push({ x: E, y: S });
      }
      if (myW && canWalkHere(W, S)) {
        result.push({ x: W, y: S });
      }
    }
  }

  // returns every available North East, South East,
  // South West or North West cell including the times that
  // you would be squeezing through a "crack"
  function diagonalNeighboursFree(myN, myS, myE, myW, N, S, E, W, result) {
    myN = N > -1;
    myS = S < worldHeight;
    myE = E < worldWidth;
    myW = W > -1;
    if (myE) {
      if (myN && canWalkHere(E, N)) {
        result.push({ x: E, y: N });
      }
      if (myS && canWalkHere(E, S)) {
        result.push({ x: E, y: S });
      }
    }
    if (myW) {
      if (myN && canWalkHere(W, N)) {
        result.push({ x: W, y: N });
      }
      if (myS && canWalkHere(W, S)) {
        result.push({ x: W, y: S });
      }
    }
  }

  // returns boolean value (world cell is available and open)
  function canWalkHere(x, y) {
    return Grid.isWalkable(x, y);
  }

  // Node function, returns a new object with Node properties
  // Used in the calculatePath function to store route costs, etc.
  function Node(Parent, Point) {
    return {
      // pointer to another Node object
      Parent: Parent,
      // array index of this Node in the world linear array
      value: Point.x + (Point.y * worldWidth),
      // the location coordinates of this Node
      x: Point.x,
      y: Point.y,
      // the heuristic estimated cost
      // of an entire path using this node
      f: 0,
      // the distanceFunction cost to get
      // from the starting point to this node
      g: 0
    };
  }

  // Path function, executes AStar algorithm operations
  function calculatePath() {
    // create Nodes from the Start and End x,y coordinates
    let mypathStart = Node(null, { x: pathStart[0], y: pathStart[1] });
    let mypathEnd = Node(null, { x: pathEnd[0], y: pathEnd[1] });
    // create an array that will contain all world cells
    let AStar = new Array(worldSize);
    // list of currently open Nodes
    let Open = [mypathStart];
    // list of the final output array
    let result = [];
    // reference to a Node (that is nearby)
    let myNeighbours;
    // reference to a Node (that we are considering now)
    let myNode;
    // reference to a Node (that starts a path in question)
    let myPath;
    // temp integer variables used in the calculations
    let length, max, min, i, j;
    // iterate through the open list until none are left
    do {
      max = worldSize;
      min = -1;
      for (i = 0; i < length; i++) {
        if (Open[i].f < max) {
          max = Open[i].f;
          min = i;
        }
      }
      // grab the next node and remove it from Open array
      myNode = Open.splice(min, 1)[0];
      // is it the destination node?
      if (myNode.value === mypathEnd.value) {
        // we found a path!
        do {
          result.unshift([myNode.x, myNode.y]);

          myNode = myNode.Parent;
        }
        while (myNode !== null);

        // clear the working arrays
        AStar = Open = [];

        return result;
      }

      // find which nearby nodes are walkable
      myNeighbours = neighbours(myNode.x, myNode.y);
      for (i = 0, j = myNeighbours.length; i < j; i++) {
        // test each one that hasn't been tried already
        myPath = Node(myNode, myNeighbours[i]);
        if (!AStar[myPath.value]) {
          // estimated cost of this particular route so far
          myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
          // estimated cost of entire guessed route to the destination
          myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
          // remember this new path for testing above
          Open.push(myPath);
          // mark this node in the world graph as visited
          AStar[myPath.value] = true;
        }
      }

      length = Open.length;
    } while (0 < length);

    return result;
  }

  return calculatePath();
}
