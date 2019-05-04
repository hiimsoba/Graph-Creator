let addEdge = false ;
let addNode = false ;
let removeEdge = false ;
let removeNode = false ;

let selectNodes = false ;
let selectedNodes = [] ;

function executeInput(str) {
  selectNodes = true ;
  if(str[0] === 'R') {
    if(str[1] === 'E') {
      removeEdge = true ;
    } else if(str[1] === 'N') {
      removeNode = true ;
    }
  } else if(str[0] === 'A') {
    if(str[1] === 'E') {
      addEdge = true ;
    } else if(str[1] === 'N') {
      addNode = true ;
      selectNodes = false ;
    }
  }
}

function aNode() {
  addNode = false ;
  console.log("Adding node!") ;
  let nodeOrder = getOrder() ;
  nodes.push(new node(nodeOrder, mouseX, mouseY)) ;
  refreshMST() ;
}

function rNode(nd) {
  removeNode = false ;
  let n = nd[0] ;
  console.log("Removing node!") ;
  for(let i = edges.length - 1 ; i >= 0 ; i--) {
    let e = edges[i] ;
    if(e.to == n.order || e.from == n.order) {
      edges.splice(i, 1) ;
    }
  }
  for(let i = 0 ; i < nodes.length ; i++) {
    if(n === nodes[i]) {
      nodes.splice(i, 1) ;
      refreshMST() ;
      return ;
    }
  }
}

function aEdge(snodes) {
  addEdge = false ;
  let nodeA = snodes[0] ;
  let nodeB = snodes[1] ;
  if(nodeA === nodeB) {
    console.log("Not possible to add an edge between the same node yet.") ;
    return ;
  }
  for(let e of edges) {
    if((e.from == nodeA.order && e.to == nodeB.order) || (e.from == nodeB.order && e.to == nodeA.order)) {
      console.log("Edge already exists between the nodes " + nodeA.order + " and " + nodeB.order + "!") ;
      return ;
    }
  }
  edges.push(new edge(nodeA, nodeB)) ;
  refreshMST() ;
}

function rEdge(snodes) {
  removeEdge = false ;
  let nodeA = snodes[0] ;
  let nodeB = snodes[1] ;
  if(nodeA === nodeB) {
    console.log("Not possible to remove an edge between the same node yet.") ;
    return ;
  }
  for(let i = 0 ; i < edges.length ; i++) {
    let e = edges[i] ;
    if((e.from == nodeA.order && e.to == nodeB.order) || (e.from == nodeB.order && e.to == nodeA.order)) {
      edges.splice(i, 1) ;
      refreshMST() ;
      return ;
    }
  }
  console.log("No edge between the nodes " + nodeA.order + " and " + nodeB.order + "!") ;
}
