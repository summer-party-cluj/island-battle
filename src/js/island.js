(function () {
	var my = {
		w: 0,
		h: 0,
		cX: [],
		cY: [],
		cR: 48,
		minRad: 16,
		maxRad: 50,
		inslandsNr: 10,
		islands: [],
		ratioDraw: 1,
		generateRandomDim: function () {
			return Math.round(my.minRad + Math.random() * (my.maxRad - my.minRad));
		},
		calculateIslandCoords: function (n) {
			my.cX[n] = Math.round((Math.random() * (my.w - my.cR * 2))) + my.cR;
			my.cY[n] = Math.round((Math.random() * (my.h - my.cR * 2))) + my.cR;
		},
		measureDistance: function (n) {
			var i,
				dX,
				dY,
				distanceQ,
				dMinQ = Math.pow(my.cR * 2, 2);
			dMinQ = Math.pow(my.cR * 2, 2);
			for (i = 0; i < n; i = i + 1) {
                dX = my.cX[n] - my.cX[i];
                dY = my.cY[n] - my.cY[i];
                distanceQ = Math.round(Math.pow(dX, 2) + Math.pow(dY, 2));
                if (distanceQ < dMinQ) {        
                	my.calculateIslandCoords(n);
                    i = 0;                    
                    dX = my.cX[n] - my.cX[i];
                    dY = my.cY[n] - my.cY[i];
                    distanceQ = Math.round(Math.pow(dX, 2) + Math.pow(dY, 2));
                    i = i - 1;
                }
            }
		},
		buildIslands: function () {
			var islandOuterEl,
				islandEl,
				battleEl,
				islandRad,
				islandOwner,
				inslandsNr;
			battleEl = IB.Area.getBattleAreaElement();
			inslandsNr = my.inslandsNr;
			for (i = 0; i < inslandsNr ; i = i + 1) {
				islandOwner = 0;
				if (i === 0) {
					islandOwner = 1;
				} else if (i === 1) {
					islandOwner = -1;
				}
				if (i > 2) {
					my.cR = my.generateRandomDim();
					if (my.cR % 2 === 1) {
						my.cR = my.cR - 1;
					}
				}
				my.calculateIslandCoords(i);
				if (i > 0) {
					my.measureDistance(i);
				}
				islandOuterEl = document.createElement("DIV");
				islandOuterEl.setAttribute("class", "islandOuter");
				islandOuterEl.setAttribute("id", "island" + i);
				islandEl = document.createElement("DIV");
				islandEl.setAttribute("class", "island owner" + islandOwner);
				islandOuterEl.appendChild(islandEl);
				battleEl.appendChild(islandOuterEl);
				my.islands[i] = {
					owner: islandOwner,
					rad: my.cR,
					top: (my.cY[i] - my.cR),
					left: (my.cX[i] - my.cR),
					initVal: (my.cR  / 2),
					val: (my.cR  / 2)
				};
			}
		},
		getLoc: function () {
			return my.islands;
		},
		init: function (w, h) {
			my.w = w;
			my.h = h;
			my.buildIslands();
		},
		update: function (ratio) {
			var islandOuterEl,
				islandEl,
				islandRad,
				thisIsland,
				radius,
				islandsNr;
			ratio = ratio || 1;
			inslandsNr = my.inslandsNr;
			for (i = 0 ; i < my.inslandsNr; i = i + 1) {
				thisIsland = my.islands[i];
				radius = parseInt(thisIsland.initVal * ratio, 10);
				islandOuterEl = document.getElementById("island" + i);
				islandOuterEl.style.top = parseInt(thisIsland.top * ratio, 10) + "px";
				islandOuterEl.style.left = parseInt(thisIsland.left * ratio, 10) + "px";
				islandOuterEl.style.width = radius * 2 + "px";
				islandOuterEl.style.height = radius * 2+ "px";
				islandOuterEl.style.borderRadius = radius * 2+ "px";
				islandRad = radius - 1;
				//now island
				islandEl = islandOuterEl.childNodes[0];
				islandEl.style.lineHeight = islandRad * 2 + "px";
				islandEl.style.width = islandRad * 2 + "px";
				islandEl.style.height = islandRad * 2 + "px";
				islandEl.style.borderRadius = islandRad * 2 + "px";
				islandEl.innerHTML = thisIsland.val;
			}
		}
	},
	Island = (function () {
		return {
			init: my.init,
			update: my.update,
			getLoc: my.getLoc
		};
	}());
	window.IB.Island = Island;
}());