class node {
  constructor(n, x, y) {
    this.order = n ;
    this.x = x ;
    this.y = y ;
    this.dragged = false ;
    this.setInitialPos = false ;
    this.initX = x ;
    this.initY = y ;
    this.isSelected = false ;
  }
  clicked() {
    return dist(this.x, this.y, mouseX, mouseY) <= nodeDiam / 2 ;
  }
  show() {
    if(this.dragged) {
      if(!this.setInitialPos) {
        this.dx = mouseX - this.x ;
        this.dy = mouseY - this.y ;
        this.setInitialPos = true ;
      }
      this.x = constrain(mouseX - this.dx, nodeDiam / 2, width - nodeDiam / 2) ;
      this.y = constrain(mouseY - this.dy, nodeDiam / 2, height - nodeDiam / 2) ;
    }
    fill(0) ;
    stroke(255) ;
    strokeWeight(this.isSelected ? 4 : 2) ;
    ellipse(this.x, this.y, nodeDiam, nodeDiam) ;
    textAlign(CENTER, CENTER) ;
    textSize(16) ;
    fill(255) ;
    strokeWeight(1) ;
    text(this.order, this.x, this.y) ;
  }
}

class edge {
  constructor(a, b, cost) {
    this.points = [a, b] ;
    this.from = a.order ;
    this.to = b.order ;
    this.cost = cost || dist(a.x, a.y, b.x, b.y) ;
  }
  show() {
    strokeWeight(3) ;
    stroke(255) ;
    line(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y) ;
  }
}
