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
        this.rocketForm.id = "rocketForm";
        this.small = this.createElement("small");
        this.small.textContent = "Rocket ID must contain exactly 8 characters";
        this.small.classList = "hidden";
        this.idInput = this.createElement("input");
        this.idInput.type = "text";
        this.idInput.placeholder = "Add Rocket ID";
        this.idInput.name = "rocketId";
        this.idInput.id = "rocketId";
        this.addRocketButton = this.createElement("button");
        this.addRocketButton.textContent = "Add Rocket";
        this.rocketForm.append(this.idInput, this.small, this.addRocketButton);
        // Thruster Form
        this.thrusterForm = this.createElement("form");
        this.thrusterMaxPowerInput = this.createElement("input");
        this.thrusterMaxPowerInput.type = "number";
        this.thrusterMaxPowerInput.placeholder = "Add Thruster Max Power";
        this.thrusterMaxPowerInput.id = "thrusterMaxPower";
        this.thrusterMaxPowerInput.name = "maxPower";
        this.thrusterMaxPowerInput.setAttribute("step", "10");
        this.addThrusterButton = this.createElement("button", "addThrusterButton");
        this.addThrusterButton.textContent = "Add Thruster to Rocket";
        this.thrusterForm.append(this.thrusterMaxPowerInput, this.addThrusterButton);
        // Rocket List
        this.rocketList = this.createElement("ul", "rocket-list");
        this.app.append(this.title, this.startDiv, this.rocketList);
    }
    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }
    get _getIdText() {
        const inputValue = this.idInput.value;
        return inputValue;
    }
    _resetIdInput() {
        this.idInput.value = "";
    }
    get _getThrusterPower() {
        const maxPowerInput = parseInt(this.thrusterMaxPowerInput.value);
        if (maxPowerInput % 10 == 0) {
            return maxPowerInput;
        }
        else {
            alert("Max Power must be divisible by 10");
            return false;
        }
    }
    _resetThrusterPower() {
        this.thrusterMaxPowerInput.value = "";
    }
    createElement(tag, className, ...args) {
        const element = document.createElement(tag);
        let objectArgs = arguments;
        if (tag === "button") {
            element.dataset.rocketId = objectArgs[2];
            element.dataset.thrusterId = objectArgs[3];
        }
        if (className) {
            element.classList.add(className);
        }
        return element;
    }
    displayRockets(rockets) {
        while (this.rocketList.firstChild) {
            this.rocketList.removeChild(this.rocketList.firstChild);
        }
        rockets.forEach((rocket) => {
            const li = this.createElement("li", "rocket");
            li.id = rocket.id;
            const div = this.createElement("div");
            const p = this.createElement("p");
            p.textContent = `Rocket ${rocket.id} has ${rocket.numberOfThrusters} thruster/s.The current speed is ${rocket.rocketSpeed}`;
            const startThrusterFormButton = this.createElement("button", "startThrusterFormButton", rocket.id);
            const increaseRocketSpeedButton = this.createElement("button", "increaseRocketSpeedBtn", rocket.id);
            increaseRocketSpeedButton.textContent = "Speed Up Rocket";
            const decreaseRocketSpeedButton = this.createElement("button", "decreaseRocketSpeedBtn", rocket.id);
            decreaseRocketSpeedButton.textContent = "Brake Rocket";
            startThrusterFormButton.textContent = "New Thruster";
            this.bindCreateThrusterForm(startThrusterFormButton, li);
            const ul = this.createElement("ul");
            if (rocket.thrusters) {
                rocket.thrusters.forEach((thruster) => {
                    const li = this.createElement("li", "thruster");
                    li.id = thruster.thrusterId;
                    const span = this.createElement("span");
                    const p = this.createElement("p");
                    p.textContent = `Thruster ${thruster.thrusterId} current speed is ${thruster.thrusterSpeed} and its max power is ${thruster.thrusterMaxPower}`;
                    const increaseSpeedBtn = this.createElement("button", "increaseSpeedBtn", rocket.id, thruster.thrusterId);
                    increaseSpeedBtn.textContent = "Speed Up Thruster";
                    const decreaseSpeedBtn = this.createElement("button", "decreaseSpeedBtn", rocket.id, thruster.thrusterId);
                    decreaseSpeedBtn.textContent = "Brake Thruster";
                    span.append(p, increaseSpeedBtn, decreaseSpeedBtn);
                    li.append(span);
                    ul.append(li);
                });
            }
            li.append(p, startThrusterFormButton, increaseRocketSpeedButton, decreaseRocketSpeedButton, ul);
            this.rocketList.appendChild(li);
        });
    }
    bindCreateRocketForm() {
        this.startButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.app.replaceChild(this.rocketForm, this.startDiv);
            this.idInput.addEventListener("change", (event) => {
                if (event.srcElement.value.length !== 8) {
                    this.small.classList.remove("hidden");
                }
                else {
                    this.small.classList.add("hidden");
                }
            });
        });
    }
    bindAddRocketForm(handler) {
        this.rocketForm.addEventListener("submit", (event) => {
            event.preventDefault();
            if (this._getIdText.length == 8) {
                handler(this._getIdText);
                this._resetIdInput();
            }
            else {
                return false;
            }
        });
    }
    bindCreateThrusterForm(button, element) {
        button.addEventListener("click", (event) => {
            const rocketId = button.dataset.rocketId;
            this.thrusterForm.dataset.rocketId = rocketId;
            element.insertBefore(this.thrusterForm, button);
        });
    }
    bindAddThrusterForm(handler) {
        this.thrusterForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const rocketId = event.target.dataset.rocketId;
            if (this._getThrusterPower) {
                handler(rocketId, this._getThrusterPower);
                this._resetThrusterPower();
            }
            else {
                return false;
            }
        });
    }
    bindIncreaseRocketSpeed(handler) {
        this.rocketList.addEventListener("click", (event) => {
            if (event.target.className === "increaseRocketSpeedBtn") {
                const rocketId = event.target.dataset.rocketId;
                handler(rocketId);
            }
        });
    }
    bindDecreaseRocketSpeed(handler) {
        this.rocketList.addEventListener("click", (event) => {
            if (event.target.className === "decreaseRocketSpeedBtn") {
                const rocketId = event.target.dataset.rocketId;
                handler(rocketId);
            }
        });
    }
    bindIncreaseThrusterSpeed(handler) {
        this.rocketList.addEventListener("click", (event) => {
            if (event.target.className === "increaseSpeedBtn") {
                const rocketId = event.target.dataset.rocketId;
                const thrusterId = event.target.dataset.thrusterId;
                handler(rocketId, thrusterId);
            }
        });
    }
    bindDecreaseThrusterSpeed(handler) {
        this.rocketList.addEventListener("click", (event) => {
            if (event.target.className === "decreaseSpeedBtn") {
                const rocketId = event.target.dataset.rocketId;
                const thrusterId = event.target.dataset.thrusterId;
                handler(rocketId, thrusterId);
            }
        });
    }
}
//# sourceMappingURL=view.js.map