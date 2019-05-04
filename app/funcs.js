let showMSTbutton ;
let addRandomENodeButton ;
let addRandomNNodeButton ;

let drawingMST = false ;

let pointDragged = false ;

let mstEdges, mstVertices, mstCost ;

function createNodesEdges(nodeCount, b) {
  for(let i = 0 ; i < nodeCount ; i++) {
    nodes.push(new node(getOrder(), random(nodeDiam / 2, width - nodeDiam / 2), random(nodeDiam / 2, height - nodeDiam / 2))) ;
  }
  if(b) {
    for(let i = 0 ; i < nodes.length - 1 ; i++) {
      edges.push(new edge(nodes[i], nodes[nodes.length - 1])) ;
    }
  }
}

function makeAdjacencyMatrix() {
  let res = [] ;
  for(let i = 0 ; i < nodes.length ; i++) {
    res[i] = [] ;
    for(let j = 0 ; j < nodes.length ; j++) {
      res[i][j] = 0 ;
    }
  }
  nodes.sort((a, b) => {
      if(a.order < b.order) {
      return -1 ;
    } else if(a.order == b.order) {
      return 0 ;
    } else {
      return 1 ;
    }
  }) ;
  let nodesOrders = [] ;
  let index = 0 ;
  for(let n of nodes) {
    nodesOrders[n.order] = index++ ;
  }
  for(let i = 0 ; i < edges.length ; i++) {
    res[nodesOrders[edges[i].to]][nodesOrders[edges[i].from]] = 1 ;
    res[nodesOrders[edges[i].from]][nodesOrders[edges[i].to]] = 1 ;
  }
  return res ;
}

function DFS(viz, nod, m) {
    viz[nod] = 1 ;
    for(let i = 0 ; i < nodes.length ; i++) {
      if(!viz[i] && m[nod][i]) {
        DFS(viz, i, m) ;
      }
    }
}

function checkIfConnected() {
  if(nodes.length < 1) {
    console.log("The graph is empty.") ;
    return ;
  }
  let matrix = makeAdjacencyMatrix() ;
  let visited = [] ;
  for(let i = 0 ; i < nodes.length ; i++) {
    visited[i] = 0 ;
  }
  DFS(visited, nodes[0].order, matrix) ;
  for(let v of visited) {
    if(!v) {
      return false ;
    }
  }
  return true ;
}

function getOrder() {
  nodes.sort((a, b) => {
      if(a.order < b.order) {
      return -1 ;
    } else if(a.order == b.order) {
      return 0 ;
    } else {
      return 1 ;
    }
  }) ;
  for(let i = 0 ; i < nodes.length ; i++) {
    if(nodes[i].order != i) {
      return i ;
    }
  }
  return nodes.length ;
}

function refreshMST() {
  if(drawingMST) {
    let mst = MST(edges, nodes) ;
    if(mst !== undefined) {
      mstEdges = mst[0] ;
      mstVertices = mst[1] ;
      mstCost = mst[2] ;
    }
  }
}

function drawMST() {
  if(mstEdges === undefined) {
    return ;
  }
  if(pointDragged) {
    refreshMST() ;
  }
  if(pointDragged) {
    for(let e of edges) {
      e.cost = dist(e.points[0].x, e.points[0].y, e.points[1].x, e.points[1].y) ;
    }
  }
  for(let e of mstEdges) {
    e.show() ;
  }
  for(let n of mstVertices) {
    n.show() ;
  }
  strokeWeight(1) ;
  text("Cost of the MST : " + mstCost, width / 7.27, height / 22.85) ;
}

function MSTButtonLogics() {
  if(showMSTbutton.elt.innerHTML === "Show MST") {
    showMSTbutton.elt.innerHTML = "Hide MST" ;
    showMSTbutton.elt.innerText = "Hide MST" ;
  } else if(showMSTbutton.elt.innerHTML === "Hide MST") {
    showMSTbutton.elt.innerHTML = "Show MST" ;
    showMSTbutton.elt.innerText = "Show MST" ;
  }
  drawingMST = !drawingMST ;
}
