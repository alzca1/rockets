class View {
  constructor() {
    this.app = this.getElement("#root");
    this.title = this.createElement("h1");
    this.title.textContent = "Rocket Builder";
    // Startup Button
    this.startDiv = this.createElement('div')
    this.startButton = this.createElement("button");
    this.startButton.textContent = "Start Rocket Builder";
    this.startDiv.append(this.startButton)

    // RocketID Form
    
    this.rocketForm = this.createElement("form");
    this.idInput = this.createElement('input'); 
    this.idInput.type = 'text'; 
    this.idInput.placeholder = 'Add Rocket ID'
    this.idInput.name = 'rocketId'
    this.addRocketButton = this.createElement('button'); 
    this.addRocketButton.textContent = 'Add Rocket';
    this.rocketForm.append(this.idInput,this.addRocketButton);
    
    // 


    this.app.append(this.title, this.startDiv);
    
  }

  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  get _getText(){
      this.idInput.length === 8? this.input.value: false
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }
    return element;
  }

  bindCreateRocketForm(handler){
      this.startButton.addEventListener('click', event => {
          event.preventDefault();

        this.app.removeChild(this.startDiv);
        this.app.appendChild(this.rocketForm)
      })
  }

  bindAddRocketForm(handler){
      this.addRocketButton.addEventListener('click', event => {
          event.preventDefault(); 

      })
  }
}

// [x] Creamos un botón que inicie el constructor ('Start builder')
// [x] A ese botón le añadimos un event listener que active un form
// [] El form contendrá un campo (rocket ID) que admitirá un id de 8 caracteres (validación!)
// [] El form incluirá un botón ('Add Rocket') que tendrá otro listener que acudirá a Model para crear un cohete
// [] Al pulsar el botón, activamos el displayRockets() y mostrará un cohete junto con un botón
// [] ese botón ('Add Thruster) tendrá un listener que acudirá a Model para crear un thruster
// [] Al pulsar el botón, vuelve a activarse displayRockets() para mostrar el thruster como un child
// [] El thruster mostrará su id y su currentSpeed
// [] El thruster irá acompañado de dos botones ('Increase Speed)('Decrease Speed')
