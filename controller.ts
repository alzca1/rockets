class Controller {
    model;
    view;
    constructor(model, view) {
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
    handleAddRocket = (rocketId):void => {
      this.model.addRocket(rocketId);
    };
  
    handleAddThruster = (rocketId, maxPower):void => {
      this.model.addThruster(rocketId, maxPower);
    };
  
    onRocketListChanged = (rockets):void => {
      this.view.displayRockets(rockets);
    };
  
    handleIncreaseRocketSpeed = (rocketId):void => {
      this.model.increaseRocketSpeed(rocketId);
    };
    handleDecreaseRocketSpeed = (rocketId):void => {
      this.model.decreaseRocketSpeed(rocketId);
    };
  
    handleIncreaseThrusterSpeed = (rocketId, thrusterId):void => {
      this.model.increaseThrusterSpeed(rocketId, thrusterId);
    };
    handleDecreaseThrusterSpeed = (rocketId, thrusterId):void => {
      this.model.decreaseThrusterSpeed(rocketId, thrusterId);
    };
  }