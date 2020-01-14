class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindCreateRocketForm();
    this.view.bindAddRocketForm(); 
  }
}
