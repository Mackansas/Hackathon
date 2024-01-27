import { Engine, Events, Render, Runner, Bodies, Composite } from "matter-js";
import React from "react";

const worldWidth = 800;
const startPins = 5;
const pinLines = 16;
const pinSize = 3;
const pinGap = 30;
const ballSize = 5;
const ballElastity = 0.75;
const possibleCharacters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

function Plinko({ addCharacter }) {
  const plinkoRef = React.useRef(null);
  const [resString, setResString] = React.useState("");
  let currentlyFalling = false;
  // create an engine
  const engine = Engine.create();
  React.useEffect(() => {
    // create a renderer
    plinkoRef.current.innerHTML = "";
    const render = Render.create({
      element: plinkoRef.current,
      engine: engine,
    });

    const pins = [];
    for (let l = 0; l < pinLines; l++) {
      const linePins = startPins + l;
      const lineWidth = linePins * pinGap;
      for (let i = 0; i < linePins; i++) {
        const pin = Bodies.circle(
          worldWidth / 2 - lineWidth / 2 + i * pinGap,
          100 + l * pinGap,
          pinSize,
          {
            isStatic: true,
          }
        );
        pins.push(pin);
      }
    }
    Composite.add(engine.world, pins);
    for (const character of possibleCharacters) {
        Composite.add(engine.world, Bodies.rectangle(400 + 20 * (possibleCharacters.indexOf(character) - possibleCharacters.length / 2), 590, 20, 20, {
            label: character,
            isStatic: true,
            isSensor: true,            
        }));
    }

    Composite.add(engine.world, Bodies.rectangle(-200, 700, 20000, 200, {
        label: "Catch-all",
        isStatic: true,
        isSensor: true,            
    }));

    // run the renderer
    Render.run(render);

    // create runner
    const runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

    Events.on(engine, 'collisionActive', function (event) {
        const label = event.pairs?.[0]?.bodyA?.label
        const circle = event.pairs?.[0]?.bodyB;
        if (label === "Catch-all") {
            Composite.remove(engine.world, circle)
            currentlyFalling = false;
            return;
        }
        if (label !== "Circle Body") {
            if (circle) {
                Composite.remove(engine.world, circle)
                currentlyFalling = false;
            }
            addCharacter(label);
            setResString(resString + label);
        }
    });

  }, [resString]);

  const clickHandler = () => {
    if (currentlyFalling) return;
    const ball = Bodies.circle(worldWidth / 2 - ballSize * Math.random() * 5, 0, ballSize, {
      restitution: ballElastity,
    });
    currentlyFalling = true;
    Composite.add(engine.world, ball);
  };

  return (
    <div key={resString} className="plinko-container">
        <button onClick={clickHandler}>Drop Ball</button>
        <div className="plinko" ref={plinkoRef}></div>
        <div className="plinko-characters">
            {possibleCharacters.map((char, i) => <div key={`pchar${i}`} className="plinko-character">{char}</div>)}
        </div>
    </div>
  );
}

export default Plinko;
