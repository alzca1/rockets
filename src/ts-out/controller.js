class Controller {
    constructor(model, view) {
        this.handleAddRocket = (rocketId) => {
            this.model.addRocket(rocketId);
        };
        this.handleAddThruster = (rocketId, maxPower) => {
            this.model.addThruster(rocketId, maxPower);
        };
        this.onRocketListChanged = (rockets) => {
            this.view.displayRockets(rockets);
        };
        this.handleIncreaseRocketSpeed = (rocketId) => {
            this.model.increaseRocketSpeed(rocketId);
        };
        this.handleDecreaseRocketSpeed = (rocketId) => {
            this.model.decreaseRocketSpeed(rocketId);
        };
        this.handleIncreaseThrusterSpeed = (rocketId, thrusterId) => {
            this.model.increaseThrusterSpeed(rocketId, thrusterId);
        };
        this.handleDecreaseThrusterSpeed = (rocketId, thrusterId) => {
            this.model.decreaseThrusterSpeed(rocketId, thrusterId);
        };
        this.model = model;
        this.view = view;
        this.onRocketListChanged(this.model.rockets);
        this.view.bindCreateRocketForm();
        this.view.bindAddRocketForm(this.handleAddRocket);
        this.view.bindAddThrusterForm(this.handleAddThruster);
        this.view.bindIncreaseRocketSpeed(this.handleIncreaseRocketSpeed);
        this.view.bindDecreaseRocketSpeed(this.handleDecreaseRocketSpeed);
        this.view.bindIncreaseThrusterSpeed(this.handleIncreaseThrusterSpeed);
        this.view.bindDecreaseThrusterSpeed(this.handleDecreaseThrusterSpeed);
        this.model.bindRocketListChanged(this.onRocketListChanged);
    }
}
//# sourceMappingURL=controller.js.map