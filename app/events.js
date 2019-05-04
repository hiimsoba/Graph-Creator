function mousePressed() {
  if(addNode) {
    aNode() ;
    return ;
  }
  for(let n of nodes) {
    if(n.clicked()) {
      if(selectNodes) {
        selectedNodes.push(n) ;
        n.isSelected = !n.isSelected ;
        if(removeNode && selectedNodes.length === 1) {
          rNode(selectedNodes) ;
          if(selectedNodes[0]) {
            selectedNodes[0].isSelected = false ;
          }
          selectedNodes = [] ;
          selectNodes = false ;
        } else if(selectedNodes.length === 2) {
            if(removeEdge) {
              rEdge(selectedNodes) ;
            } else if(addEdge) {
              aEdge(selectedNodes) ;
            }
            selectedNodes[0].isSelected = false ;
            selectedNodes[1].isSelected = false ;
            selectedNodes = [] ;
            selectNodes = false ;
          }
      } else {
        n.dragged = true ;
        pointDragged = true ;
      }
      break ;
    }
  }
}

function mouseReleased() {
  for(let n of nodes) {
    if(n.dragged) {
      n.dragged = false ;
      n.setInitialPos = false ;
      pointDragged = false ;
      break ;
    }
  }
}

let userKeyInput = "" ;

function keyPressed() {
  if(key === 'C') {
    addEdge = false ;
    addNode = false ;
    removeEdge = false ;
    removeNode = false ;
    selectNodes = false ;
    if(selectedNodes[0]) {
      selectedNodes[0].isSelected = false ;
    }
    if(selectedNodes[1]) {
      selectedNodes[1].isSelected = false ;
    }
    selectedNodes = [] ;
  }
  if(userKeyInput.length < 2) {
    if(key === 'R' || key === 'A') {
      userKeyInput = key ;
    } else if(userKeyInput.length === 1 && (key === 'E' || key === 'N')) {
      userKeyInput += key ;
      executeInput(userKeyInput) ;
      userKeyInput = "" ;
    }
  }
}
