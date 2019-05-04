let nodes = [] ;
let nodeDiam = 40 ;

let edges = [] ;

function setup() {
  createCanvas(800, 700) ;

  createP('') ;

  addRandomENodeButton = createButton("Add a random node connecting to all other nodes") ;
  addRandomENodeButton.mousePressed(() => {
    createNodesEdges(1, true) ;
    refreshMST() ;
  }) ;

  addRandomNNodeButton = createButton("Add a random node without connecting") ;
  addRandomNNodeButton.mousePressed(() => {
    createNodesEdges(1, false) ;
    refreshMST() ;
  }) ;

  showMSTbutton = createButton("Show MST") ;
  showMSTbutton.mousePressed(() => {
    MSTButtonLogics() ;
    refreshMST() ;
  }) ;
}

function draw() {
  background(0) ;

  if(drawingMST) {
    drawMST() ;
  } else {
    for(let e of edges) {
      if(pointDragged) {
        e.cost = dist(e.points[0].x, e.points[0].y, e.points[1].x, e.points[1].y) ;
      }
      e.show() ;
    }
    for(let n of nodes) {
      n.show() ;
    }
  }
}
