function MST(E, V) {
	if(!checkIfConnected()) {
		console.log("The graph is not connected.") ;
		MSTButtonLogics() ;
		return ;
	}
	let newV = [random(V)] ;
	let newE = [] ;
	let visited = [] ;
	visited[newV[0].order] = true ;
	while(newV.length != V.length) {
		let newEdge = pickEdge(E, visited) ;
		newE.push(newEdge) ;
		if(newEdge === undefined) {
			console.log(newE) ;
			console.log(newV) ;
			break ;
		}
		if(visited[newEdge.from]) {
			newV.push(newEdge.points[1]) ;
			visited[newEdge.to] = true ;
		} else {
			newV.push(newEdge.points[0]) ;
			visited[newEdge.from] = true ;
		}
	}
	let treeCost = 0 ;
	for(let e of newE) {
		treeCost += e.cost ;
	}
	return [newE, newV, Number(nf(treeCost, 2, 2))] ;
}

function pickEdge(edg, v) {
	let flag = true ;
	let result ;
	let minCost ;
	for(let i = 0 ; i < edg.length ; i++) {
		if(flag) {
			if((v[edg[i].from] && !v[edg[i].to]) || (!v[edg[i].from] && v[edg[i].to])) {
				minCost = edg[i].cost ;
				result = edg[i] ;
				flag = false ;
			}
		} else {
			if(edg[i].cost < minCost && ((v[edg[i].from] && !v[edg[i].to]) || (!v[edg[i].from] && v[edg[i].to]))) {
				minCost = edg[i].cost ;
				result = edg[i] ;
			}
		}
	}
	return result ;
}
