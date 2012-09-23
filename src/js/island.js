(function () {
	var my = {
		w: 0,
		h: 0,
		cX: [],
		cY: [],
		cR: 20,
		inslandsNr: 10,
		measureDistance: function (n) {
			var i,
				dX,
				dY,
				distanceQ,
				dMinQ = Math.pow(my.cR*2,2),
				cvW = 800,
		        cvH = 400;
			dMinQ = Math.pow(my.cR * 2, 2);
			for (i = 0; i < n; i = i + 1) {
                dX = my.cX[n] - my.cX[i];
                dY = my.cY[n] - my.cY[i];
                distanceQ = Math.round(Math.pow(dX,2)+Math.pow(dY,2));
                if (distanceQ < dMinQ) {        
                	my.cX[n] = Math.round((Math.random() * (cvW - my.cR*2))) + my.cR;
                	my.cY[n] = Math.round((Math.random() * (cvH - my.cR*2))) + my.cR;
                    i = 0;                    
                    dX = my.cX[n] - my.cX[i];
                    dY = my.cY[n] - my.cY[i];
                    distanceQ = Math.round(Math.pow(dX,2)+Math.pow(dY,2));
                    i = i - 1;
                }
            }
		},
		buildIslands: function () {
			var islandEl,
				battleEl;
			battleEl = IB.Area.getBattleAreaElement();
			for (i = 0; i < my.inslandsNr ;i = i + 1) {
				my.cX[i] = Math.round((Math.random() * (my.w-my.cR*2))) + my.cR;
				my.cY[i] = Math.round((Math.random() * (my.h-my.cR*2))) + my.cR;
				if (i > 0) {
					my.measureDistance(i);
				}
				islandEl = document.createElement("DIV");
				islandEl.setAttribute("class", "island");
				islandEl.style.top = (my.cY[i] - my.cR) + "px";
				islandEl.style.left = (my.cX[i] - my.cR) + "px";
				islandEl.style.width = 2 *my.cR + "px";
				islandEl.style.height = 2 *my.cR + "px";
				islandEl.style.borderRadius = my.cR + "px";
				islandEl.innerHTML = my.cR;
				battleEl.appendChild(islandEl);
			}
		},
		init: function (w, h) {
			my.w = w;
			my.h = h;
			my.buildIslands();
			//console.log(my.cX);
			//console.log(my.cY);
		},
		update: function (w, h) {
			my.w = w;
			my.h = h;
		}
	},
	Island = (function () {
		return {
			init: my.init,
			update: my.update
		};
	}());
	window.IB.Island = Island;
}());