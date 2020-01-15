class View {
  constructor() {
    this.app = this.getElement("#root");
    this.title = this.createElement("h1");
    this.title.textContent = "Rocket Builder";
    // Startup Button
    this.startDiv = this.createElement("div");
    this.startButton = this.createElement("button");
    this.startButton.textContent = "Start Rocket Builder";
    this.startDiv.append(this.startButton);

    // RocketID Form

    this.rocketForm = this.createElement("form");
    this.idInput = this.createElement("input");
    this.idInput.type = "text";
    this.idInput.placeholder = "Add Rocket ID";
    this.idInput.name = "rocketId";
    this.addRocketButton = this.createElement("button");
    this.addRocketButton.textContent = "Add Rocket";
    this.rocketForm.append(this.idInput, this.addRocketButton);

    // Thruster Form
    this.thrusterForm = this.createElement("form");
    this.thrusterMaxPowerInput = this.createElement("input");
    this.thrusterMaxPowerInput.type = "number";
    this.thrusterMaxPowerInput.placeholder = "Add Thruster Max Power";
    this.thrusterMaxPowerInput.name = "maxPower";
    this.addThrusterButton = this.createElement("button");
    this.addThrusterButton.textContent = "Add Thruster to Rocket";
    this.thrusterForm.append(
      this.thrusterMaxPowerInput,
      this.addThrusterButton
    );

    // Rocket List
    this.rocketList = this.createElement("ul", "rocket-list");
    
    this.app.append(this.title, this.startDiv, this.rocketList);
  }

  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  get _getIdText() {
    return this.idInput.value;
  }

  _resetIdInput() {
    this.idInput.value = "";
  }

  get _getThrusterPower() {
    return this.thrusterMaxPowerInput.value;
  }

  _resetThrusterPower() {
    this.thrusterMaxPowerInput.value = "";
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }
    return element;
  }

  displayRockets(rockets) {
    while (this.rocketList.firstChild) {
      this.rocketList.removeChild(this.rocketList.firstChild);
    }

    rockets.forEach(rocket => {
      const li = this.createElement("li");
      li.id = rocket.id;

      const p = this.createElement("p");
      p.textContent = `Rocket ${rocket.id} has ${rocket.numberOfThrusters} thruster/s`;

      const startThrusterFormButton = this.createElement("button");
      startThrusterFormButton.textContent = "New Thruster";
      this.bindCreateThrusterForm(startThrusterFormButton, li);

      const ul = this.createElement("ul");
      if (rocket.thrusters) {
        rocket.thrusters.forEach(thruster => {
          const li = this.createElement("li");
          li.id = thruster.thrusterId;
          const span = this.createElement("span");
          const p = this.createElement("p");
          p.textContent = `Thruster ${thruster.thrusterId} current speed is ${thruster.thrusterSpeed} and its max power is ${thruster.maxPower}`;

          const increaseSpeedBtn = this.createElement("button");
          increaseSpeedBtn.textContent = "Speed Up Thruster";

          const decreaseSpeedBtn = this.createElement("button");
          decreaseSpeedBtn.textContent = "Brake Thruster";

          span.append(p, increaseSpeedBtn, decreaseSpeedBtn);

          li.append(span);
          ul.append(li);
        });
      }

      li.append(p,startThrusterFormButton, ul );
      this.rocketList.appendChild(li);
    });
  }

  bindCreateRocketForm() {
    this.startButton.addEventListener("click", event => {
      event.preventDefault();
      this.app.replaceChild(this.rocketForm, this.startDiv);
    });
  }

  bindAddRocketForm(handler) {
    this.rocketForm.addEventListener("submit", event => {
      event.preventDefault();

      if (this._getIdText.length == 8) {
        handler(this._getIdText);
        this._resetIdInput();
      } else {
        return false;
      }
    });
  }

  bindCreateThrusterForm(button, element) {
    button.addEventListener("click", event => {
      element.insertBefore(this.thrusterForm, button);
    });
  }

  bindAddThrusterForm(handler) {
    this.thrusterForm.addEventListener("submit", event => {
      event.preventDefault();

      const rocketId = event.srcElement.parentNode.id;

      if (this._getThrusterPower) {
        handler(rocketId, this._getThrusterPower);
        this._resetThrusterPower();
      } else {
        return false;
      }
    });
  }


}

// [x] Creamos un botón que inicie el constructor ('Start builder')
// [x] A ese botón le añadimos un event listener que active un form
// [x] El form contendrá un campo (rocket ID) que admitirá un id de 8 caracteres (validación!)
// [x] El form incluirá un botón ('Add Rocket') que tendrá otro listener que acudirá a Model para crear un cohete
// [x] Al pulsar el botón, activamos el displayRockets() y mostrará un cohete junto con un botón
// [] ese botón ('Add Thruster) tendrá un listener que acudirá a Model para crear un thruster
// [] Al pulsar el botón, vuelve a activarse displayRockets() para mostrar el thruster como un child
// [] El thruster mostrará su id y su currentSpeed
// [] El thruster irá acompañado de dos botones ('Increase Speed)('Decrease Speed')
