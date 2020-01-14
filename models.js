class Model {
  constructor() {
    this.rockets = [];
  }

  addRocket(id) {
    const rocket = {
      id: id,
      thrusters: [],
      numberOfThrusters: 0,
      rocketSpeed: 0
    };
    this.rockets.push(rocket);
  }

  // La idea es que cada vez que incrementemos o reduzcamos potencia, un método se encarge de sumar todas las speed
  // de todos los thrusters y actualice el valor de rocketSpeed.
  addThruster(rocketId, maxPower) {
    const thruster = {
      thrusterId: this.getNewThrusterId(rocketId),
      thrusterSpeed: 0,
      maxPower: maxPower
    };
    for (const rocket of this.rockets) {
      if (rocket.id === rocketId) {
        rocket.thrusters.push(thruster);
        rocket.numberOfThrusters++;
      }
    }
  }

  getRockets() {
    this.rockets.forEach(rocket =>{
      console.log(`Rocket ${rocket.id} number of thrusters is ${rocket.numberOfThrusters} and the rocket's current speed is ${rocket.rocketSpeed}`)
      rocket.thrusters.forEach(thruster =>{
        console.log(`Rocket ${rocket.id}'s thruster ${thruster.thrusterId}'s maxpower of  is ${thruster.maxPower} and its current speed is ${thruster.thrusterSpeed}`)
      })
    })
  }

  getNewThrusterId(rocketId) {
    var thrusters;
    this.rockets.map(rocket => {
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

  increaseThrusterSpeed(rocketId, thrusterId) {
    for (const rocket of this.rockets) {
      if (rocket.id === rocketId) {
        for (const thruster of rocket.thrusters) {
          if (thruster.thrusterId === thrusterId) {
            if (thruster.thrusterSpeed < thruster.maxPower) {
              thruster.thrusterSpeed += 10;
              rocket.rocketSpeed += 10;
            } else {
              console.log("Max speed reached!Cannot increase");
            }
          }
        }
      }
    }
  }

  decreaseThrusterSpeed(rocketId, thrusterId) {
    for (const rocket of this.rockets) {
      if (rocket.id === rocketId) {
        for (const thruster of rocket.thrusters) {
          if (thruster.thrusterId === thrusterId) {
            if (thruster.thrusterSpeed > 0) {
              thruster.thrusterSpeed -= 10;
              rocket.rocketSpeed -= 10;
            } else {
              console.log("Min speed reached!Cannot decrease");
            }
          }
        }
      }
    }
  }
}

//  En Model debemos crear los métodos para:
//  1) Crear un nuevo rocket
//  2) Añadir thrusters al nuevo rocket
//  3) Incrementar velocidad de un thruster
//  4) Reducir velocidad de un thruster
//  5) Registrar los cambios en la lista de cohetes (bindRocketsListChanged)
