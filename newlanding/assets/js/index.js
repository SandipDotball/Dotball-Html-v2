var flipBoard = [];
var userBoard = [];
var winningBoard = [];
function FlipBoard($config) {
	this.number = $config.text;
	this.animationDuration = $config.animationDuration || 1000;
	this.animationStartTime = null;
	this.fontSize = $config.fontSize || 70;
	this.lineHeight = $config.lineHeight || 87;
	this.width = $config.width || 60;
	this.height = $config.height || 90;

	this.current = this.number;

	this.animationLoop = this.animationLoop.bind(this);

	this.animationLoopHandle = null;

	this.createElements();
}

FlipBoard.prototype = {
	vendorPrefix: (function () {
		var styles = window.getComputedStyle(document.documentElement, ''),
			pre = (Array.prototype.slice
				.call(styles)
				.join('')
				.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
			)[1],
			dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
		return {
			dom: dom,
			lowercase: pre,
			css: '-' + pre + '-',
			js: pre[0].toUpperCase() + pre.substr(1)
		};
	})(),

	createElements: function () {
		this.wrapperElement = document.createElement('div');
		this.wrapperElement.className = 'flip-wrapper';
		this.wrapperElement.addEventListener('click', function () {
			this.animateTo(Math.floor(Math.random() * 24));
		}.bind(this));

		this.flipElement = document.createElement('ul');
		this.flipElement.className = 'flip';
		this.flipElement.style.width = this.width + 'px';
		this.flipElement.style.height = this.height + 'px';
		this.wrapperElement.appendChild(this.flipElement);

		this.flipBeforeElement = document.createElement('li');
		this.flipBeforeElement.className = 'flip-before';
		this.flipElement.appendChild(this.flipBeforeElement);

		this.flipBeforeAElement = document.createElement('a');
		this.flipBeforeAElement.href = '#';
		this.flipBeforeElement.appendChild(this.flipBeforeAElement);

		this.flipBeforeUpElement = document.createElement('div');
		this.flipBeforeUpElement.className = 'up';
		this.flipBeforeAElement.appendChild(this.flipBeforeUpElement);

		this.flipBeforeUpShadowElement = document.createElement('div');
		this.flipBeforeUpShadowElement.className = 'shadow';
		this.flipBeforeUpElement.appendChild(this.flipBeforeUpShadowElement);

		this.flipBeforeUpInnElement = document.createElement('div');
		this.flipBeforeUpInnElement.className = 'inn';
		this.flipBeforeUpInnElement.style.fontSize = this.fontSize + 'px';
		this.flipBeforeUpInnElement.style.lineHeight = this.lineHeight + 'px';
		this.flipBeforeUpElement.appendChild(this.flipBeforeUpInnElement);

		this.flipBeforeDownElement = document.createElement('div');
		this.flipBeforeDownElement.className = 'down';
		this.flipBeforeAElement.appendChild(this.flipBeforeDownElement);

		this.flipBeforeDownShadowElement = document.createElement('div');
		this.flipBeforeDownShadowElement.className = 'shadow';
		this.flipBeforeDownElement.appendChild(this.flipBeforeDownShadowElement);

		this.flipBeforeDownInnElement = document.createElement('div');
		this.flipBeforeDownInnElement.className = 'inn';
		this.flipBeforeDownInnElement.style.fontSize = this.fontSize + 'px';
		this.flipBeforeDownInnElement.style.lineHeight = this.lineHeight + 'px';
		this.flipBeforeDownElement.appendChild(this.flipBeforeDownInnElement);

		this.flipActiveElement = document.createElement('li');
		this.flipActiveElement.className = 'flip-active';
		this.flipElement.appendChild(this.flipActiveElement);

		this.flipActiveAElement = document.createElement('a');
		this.flipActiveAElement.href = '#';
		this.flipActiveElement.appendChild(this.flipActiveAElement);

		this.flipActiveUpElement = document.createElement('div');
		this.flipActiveUpElement.className = 'up';
		this.flipActiveAElement.appendChild(this.flipActiveUpElement);

		this.flipActiveUpShadowElement = document.createElement('div');
		this.flipActiveUpShadowElement.className = 'shadow';
		this.flipActiveUpElement.appendChild(this.flipActiveUpShadowElement);

		this.flipActiveUpInnElement = document.createElement('div');
		this.flipActiveUpInnElement.className = 'inn';
		this.flipActiveUpInnElement.style.fontSize = this.fontSize + 'px';
		this.flipActiveUpInnElement.style.lineHeight = this.lineHeight + 'px';
		this.flipActiveUpElement.appendChild(this.flipActiveUpInnElement);

		this.flipActiveDownElement = document.createElement('div');
		this.flipActiveDownElement.className = 'down';
		this.flipActiveAElement.appendChild(this.flipActiveDownElement);

		this.flipActiveDownShadowElement = document.createElement('div');
		this.flipActiveDownShadowElement.className = 'shadow';
		this.flipActiveDownElement.appendChild(this.flipActiveDownShadowElement);

		this.flipActiveDownInnElement = document.createElement('div');
		this.flipActiveDownInnElement.className = 'inn';
		this.flipActiveDownInnElement.style.fontSize = this.fontSize + 'px';
		this.flipActiveDownInnElement.style.lineHeight = this.lineHeight + 'px';
		this.flipActiveDownElement.appendChild(this.flipActiveDownInnElement);
	},

	appendTo: function (container) {
		container.appendChild(this.wrapperElement);
	},

	animateTo: function (number) {
		this.resetElement();

		this.number = number;
		this.animationStartTime = new Date();
		this.animationLoop();
	},

	resetElement: function () {
		cancelAnimationFrame(this.animationLoopHandle);

		this.animationStartTime = null;

		this.flipBeforeUpInnElement.innerHTML = this.number;
		this.flipBeforeDownInnElement.innerHTML = this.number;

		this.flipBeforeUpElement.style.display = 'block';
		this.flipActiveElement.style.zIndex = 0;

		this.flipActiveDownElement.style.transform =
			this.flipActiveDownElement.style[this.vendorPrefix.lowercase + 'Transform'] = 'rotateX(' + 90 + 'deg)';

		this.flipBeforeUpElement.style.transform =
			this.flipBeforeUpElement.style[this.vendorPrefix.lowercase + 'Transform'] = 'rotateX(' + 0 + 'deg)';

		this.flipBeforeUpShadowElement.style.opacity = 0;
		this.flipBeforeDownShadowElement.style.opacity = 0;

		this.current = this.number;
		this.frame = 0;
	},

	animationLoop: function () {
		var percent = (new Date() - this.animationStartTime) / this.animationDuration;

		if (percent > 1) {
			this.resetElement();

			return;
		}

		cancelAnimationFrame(this.animationLoopHandle);
		this.animationLoopHandle = requestAnimationFrame(this.animationLoop);

		if (!this.frame) {
			this.flipBeforeUpInnElement.innerHTML = this.current;
			this.flipBeforeDownInnElement.innerHTML = this.current;

			this.flipActiveUpInnElement.innerHTML = this.number;
			this.flipActiveDownInnElement.innerHTML = this.number;

			this.flipActiveDownShadowElement.style.opacity = 0;
			this.flipBeforeDownShadowElement.style.opacity = 0;
			this.flipActiveUpShadowElement.style.opacity = 0;
			this.flipBeforeUpShadowElement.style.opacity = 0;
		}

		var frame = Math.floor((new Date() - this.animationStartTime) / (1000 / 60));
		if (this.frame === frame) return;
		this.frame = frame;

		var turnPercent;

		if (percent > .5) {
			turnPercent = (percent - .5) * 2;

			if (.7 > percent) {
				this.flipActiveElement.style.zIndex = 2;
			} else {
				this.flipActiveElement.style.zIndex = 4;
			}

			this.flipBeforeUpElement.style.display = 'none';
			this.flipActiveDownElement.style.zIndex = 2;

			this.flipActiveDownElement.style.transform =
				this.flipActiveDownElement.style[this.vendorPrefix.lowercase + 'Transform'] = 'rotateX(' + (90 - (90 * turnPercent)).toFixed(3) + 'deg)';

			this.flipActiveDownShadowElement.style.opacity = (1 - (.3 + (.7 * turnPercent))).toFixed(3);

			this.flipActiveUpShadowElement.style.opacity = (1 - (1 * turnPercent)).toFixed(3);

			this.flipBeforeDownShadowElement.style.opacity = turnPercent;

		} else {
			turnPercent = percent * 2;

			this.flipActiveElement.style.zIndex = 1;

			this.flipActiveUpShadowElement.style.opacity = 1;

			this.flipBeforeUpShadowElement.style.opacity = (.2 + (.8 * turnPercent)).toFixed(3);

			this.flipBeforeUpElement.style.transform =
				this.flipBeforeUpElement.style[this.vendorPrefix.lowercase + 'Transform'] = 'rotateX(' + (-90 * turnPercent).toFixed(3) + 'deg)';

			this.flipBeforeUpElement.style.zIndex = 2;
		}
	}
};

var c = document.createElement('div');
var d = document.createElement('div');
var e = document.createElement('div');
c.style.cssText = ''
document.body.querySelector(".squadChanges .users").prepend(c);
document.body.querySelector(".squadChanges .squad").prepend(d);
document.body.querySelector(".squadChanges .winnings").prepend(e);
var io =3;
function createAnimatedFlipBoard(numberval, newval, keyval, div, board) {
	var number = 0;
	if (newval) {
		board.push(new FlipBoard({ text: number, fontSize: 20, lineHeight: 37, width: 30, height: 40, animationDuration: 500 }));
		board[keyval].appendTo(div);
		number += parseFloat(numberval);
		board[keyval].animateTo(number);
	} else {
		board[keyval].animateTo(numberval);
	}

}

function createAnimatedFlipBoardAMPM(div) {
	var text = 'K';

	var flipBoard = new FlipBoard({ text: text, fontSize: 20, lineHeight: 37, width: 30, height: 40, animationDuration: 500 });
	flipBoard.appendTo(div);
	flipBoard.wrapperElement.style.top = '0px';
	flipBoard.animateTo(text);
}

var usersNumber = 2000;
var squadNumber = 8000;
var winnings = 20;
var usflag = true;
var uflag = true;
var sqflag = true;
var sflag = true;
var wiflag = true;
var wflag = true;
function users(){
	usersNumber += 3
	var value = String(usersNumber).split("")
	value.map(function (item, key) {
		createAnimatedFlipBoard(item, usflag, key, c, flipBoard);

	})
	usflag = false
	if(uflag){
		createAnimatedFlipBoardAMPM(c);
		uflag = false;
	}
}
users()
setInterval(function () {
	users()
}, 3000)
function squads(){
	squadNumber += 3
	var value = String(squadNumber).split("")
	value.map(function (item, key) {
		createAnimatedFlipBoard(item, sqflag, key, d, userBoard);

	})
	sqflag = false
	if(sflag){
		createAnimatedFlipBoardAMPM(d);
		sflag = false;
	}
}
squads();
setInterval(function () {
	squads();
}, 12000)
function winningof(){
	winnings += 3
	var value = String(winnings).split("")
	value.map(function (item, key) {
		createAnimatedFlipBoard(item, wiflag, key, e, winningBoard);

	})
	wiflag = false
	if(wflag){
		createAnimatedFlipBoardAMPM(e);
		wflag = false;
	}
}
winningof()
setInterval(function () {
	winningof()
}, 19000)

