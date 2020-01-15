class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.onRocketListChanged(this.model.rockets)
    this.view.bindCreateRocketForm();
    this.view.bindAddRocketForm(this.handleAddRocket);
    this.view.bindAddThrusterForm(this.handleAddThruster)
    this.model.bindRocketListChanged(this.onRocketListChanged)
    
  }
  handleAddRocket = rocketId => {
    this.model.addRocket(rocketId);
  };

  handleAddThruster = (rocketId, maxPower) => {
    this.model.addThruster(rocketId,maxPower);
  }


  onRocketListChanged = rockets => {
    
    this.view.displayRockets(rockets)
  }
}
