var Funds = function (money) {
	this.money = money;

	this.decrease = function (value) {
		this.money -= value;
	};

	this.increase = function (value) {
		this.money += value;
	};
}