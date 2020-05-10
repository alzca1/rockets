class Model {
  rockets: Rocket[];

  constructor() {
    this.rockets = [];
  }

  addRocket(id: string): void {
    const rocket = new Rocket(id);
    this.rockets.push(rocket);
    console.log(`Rocket ${rocket.id} was added`);
    this.onRocketListChanged(this.rockets);
  }

  addThruster(rocketId: string, maxPower: number): void {
    const thrusterId = this.getNewThrusterId(rocketId);
    const thruster = new Thruster(thrusterId, maxPower);
    for (const rocket of this.rockets) {
      if (rocket.id === rocketId) {
        rocket.thrusters.push(thruster);
        rocket.numberOfThrusters++;
        this.onRocketListChanged(this.rockets);
        console.log("thruster was added!");
      }
    }
  }

  getRockets(): void {
    this.rockets.forEach((rocket) => {
      console.log(
        `Rocket ${rocket.id} number of thrusters is ${rocket.numberOfThrusters} and the rocket's current speed is ${rocket.rocketSpeed}`
      );
      rocket.thrusters.forEach((thruster) => {
        console.log(
          `Rocket ${rocket.id}'s thruster ${thruster.thrusterId}'s maxpower of  is ${thruster.thrusterMaxPower} and its current speed is ${thruster.thrusterSpeed}`
        );
      });
    });
  }

  getNewThrusterId(rocketId: string): Thruster[] {
    var thrusters;
    this.rockets.map((rocket) => {
      rocket.id === rocketId
        ? (thrusters = rocket.thrusters.length + 1)
        : rocket;
    });
    return thrusters;
  }

  //*******   OJO!!!  ****** */ SPEED MODIFIERS
  // sujetos a cambio dado que podemos pasar esto a una única función
  // que registre el evento y en función de éste, incremente o
  // reduzca speed. También tener en cuenta la potencia máxima del thruster

  increaseRocketSpeed(rocketId: string): void {
    for (const rocket of this.rockets) {
      if (rocket.id == rocketId) {
        for (const thruster of rocket.thrusters) {
          if (thruster.thrusterSpeed < thruster.thrusterMaxPower) {
            thruster.thrusterSpeed += 10;
            rocket.rocketSpeed += 10;
            this.onRocketListChanged(this.rockets);
          } else {
            let statusMessage = event.srcElement.parentElement.childNodes[0];
            statusMessage.classList.add("maxSpeed");
            statusMessage.textContent = `Rocket's ${rocket.id} max power speed reached. Current speed is ${rocket.rocketSpeed}!!!`;
          }
        }
      }
    }
  }

  decreaseRocketSpeed(rocketId: string): void {
    for (const rocket of this.rockets) {
      if (rocket.id == rocketId) {
        for (const thruster of rocket.thrusters) {
          if (thruster.thrusterSpeed > 0) {
            thruster.thrusterSpeed -= 10;
            rocket.rocketSpeed -= 10;
            this.onRocketListChanged(this.rockets);
          } else {
            console.log("Min speed reached!Cannot decrease");
          }
        }
      }
    }
  }

  increaseThrusterSpeed(rocketId: string, thrusterId: string): void {
    for (const rocket of this.rockets) {
      if (rocket.id == rocketId) {
        for (const thruster of rocket.thrusters) {
          if (thruster.thrusterId == thrusterId) {
            if (thruster.thrusterSpeed < thruster.thrusterMaxPower) {
              thruster.thrusterSpeed += 10;
              rocket.rocketSpeed += 10;
              this.onRocketListChanged(this.rockets);
            } else {
              let statusMessage = event.srcElement.parentElement.childNodes[0];
              statusMessage.classList.add("maxSpeed");
              statusMessage.textContent = `Thruster ${thruster.thrusterId} current speed is ${thruster.thrusterSpeed}. Reached max speed!!`;
            }
          }
        }
      }
    }
  }

  decreaseThrusterSpeed(rocketId: string, thrusterId: string): void {
    for (const rocket of this.rockets) {
      if (rocket.id == rocketId) {
        for (const thruster of rocket.thrusters) {
          if (thruster.thrusterId == thrusterId) {
            if (thruster.thrusterSpeed > 0) {
              thruster.thrusterSpeed -= 10;
              rocket.rocketSpeed -= 10;
              this.onRocketListChanged(this.rockets);
            } else {
              console.log("Min speed reached!Cannot decrease");
            }
          }
        }
      }
    }
  }

  bindRocketListChanged(callback) {
    this.onRocketListChanged = callback;
  }
}

class Rocket {
  id: string;
  thrusters: Thruster[];
  numberOfThrusters: number;
  rocketSpeed: number;
  constructor(id) {
    this.id = id;
    this.thrusters = [];
    this.numberOfThrusters = 0;
    this.rocketSpeed = 0;
  }
}

class Thruster {
  thrusterId: string;
  thrusterSpeed: number;
  thrusterMaxPower: number;
  constructor(thrusterId, thrusterMaxPower) {
    this.thrusterId = thrusterId;
    this.thrusterMaxPower = thrusterMaxPower;
    this.thrusterSpeed = 0;
  }
}
