(function () {
	var my = {
		battleWidth: 200,
		battleHeight: 400,
		areaId: "playArea",
		battleId: "battleArea",
		eventsSet: false,
		getAreaElement: function () {
			//@description Get area element
			var areaEl;
			areaEl = document.getElementById(my.areaId);
			return areaEl;
		},
		getBattleAreaElement: function () {
			//@description Get battle area element
			var areaEl;
			areaEl = document.getElementById(my.battleId);
			return areaEl;
		},
		prepareBattleArea: function (w, h) {
			/**
			 * @description Determine battle area dimensions
			 * @param w
			 * @param h
			 */
			var maxDim,
				otherDim,
				baseDim,
				baseDim2,
				topDim,
				battleBiggerDim,
				battleSmallerDim,
				dimensionNameBigger = "width",
				dimensionNameSmaller = "height",
				isLandscape = true,
				battleEl;
			maxDim = w;
			otherDim = h;
			if (maxDim < h) {
				maxDim = h;
				otherDim = w;
				isLandscape = false;
				dimensionNameBigger = "height";
				dimensionNameSmaller = "width";
			}
			baseDim = parseInt(maxDim / 16, 10);
			baseDim2 = parseInt(otherDim / 9, 10);
			if (baseDim > baseDim2) {
				baseDim = baseDim2;
			}
			battleBiggerDim = 16 * baseDim;
			battleSmallerDim = 9 * baseDim;
			if (isLandscape) {
				topDim = h - battleSmallerDim;
				my.battleWidth = battleBiggerDim;
				my.battleHeight = battleSmallerDim;
			} else {
				topDim = h - battleBiggerDim;
				my.battleWidth = battleSmallerDim;
				my.battleHeight = battleBiggerDim;
			}
			topDim = topDim / 2;
			topDim = parseInt(topDim, 10);
			battleEl = my.getBattleAreaElement();
			battleEl.style[dimensionNameBigger] = battleBiggerDim + "px";
			battleEl.style[dimensionNameSmaller] = battleSmallerDim + "px";
			battleEl.style.top = topDim + "px";
		},
		delegate: function () {
			/**
			 * @description Attach events
			 */
			window.addEventListener("resize", my.init, false);
		},
		init: function () {
			var windowScreenWidth,
				windowScreenHeight,
				areaEl,
				mainEl;
			mainEl = document.querySelector("html");
			windowScreenWidth = mainEl.clientWidth;
			windowScreenHeight = mainEl.clientHeight;
			areaEl = my.getAreaElement();
			areaEl.style.width = windowScreenWidth + "px";
			areaEl.style.height = windowScreenHeight + "px";
			//prepare battle area
			my.prepareBattleArea(windowScreenWidth, windowScreenHeight);
			areaEl.style.display = "block";
			if (!my.eventsSet) {
				my.eventsSet = true;
				my.delegate();
				IB.Island.init(my.battleWidth, my.battleHeight);
			} else {
				IB.Island.update(my.battleWidth, my.battleHeight);
			}
		}
	},
	Area = (function () {
		return {
			init: my.init,
			getBattleAreaElement: my.getBattleAreaElement
		};
	}());
	window.IB.Area = Area;
	
}());