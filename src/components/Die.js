import Phaser from "phaser";
import React from "react";

export const Die = ({ id, res }) => {
  const createDice = (x, y, scene, duration = 1000) => {
    let diceIsRolling = false;

    const dice = scene.add.mesh(x, y, "dice-albedo");
    const shadowFX = dice.postFX.addShadow(0, 0, 0.006, 2, 0x111111, 10, 0.8);

    dice.addVerticesFromObj("dice-obj", 0.5);
    dice.panZ(6);

    dice.modelRotation.x = Phaser.Math.DegToRad(0);
    dice.modelRotation.y = Phaser.Math.DegToRad(-90);

    return (callback) => {
      if (!diceIsRolling) {
        diceIsRolling = true;
        const diceRoll = Phaser.Math.Between(1, 6);

        // Shadow
        scene.add.tween({
          targets: shadowFX,
          x: -8,
          y: 10,
          duration: duration - 250,
          ease: "Sine.easeInOut",
          yoyo: true,
        });

        scene.add.tween({
          targets: dice,
          from: 0,
          to: 1,
          duration: duration,
          onUpdate: () => {
            dice.modelRotation.x -= 0.04;
            dice.modelRotation.y -= 0.08;
          },
          onComplete: () => {
            switch (diceRoll) {
              case 1:
                dice.modelRotation.x = Phaser.Math.DegToRad(0);
                dice.modelRotation.y = Phaser.Math.DegToRad(-90);
                break;
              case 2:
                dice.modelRotation.x = Phaser.Math.DegToRad(90);
                dice.modelRotation.y = Phaser.Math.DegToRad(0);
                break;
              case 3:
                dice.modelRotation.x = Phaser.Math.DegToRad(180);
                dice.modelRotation.y = Phaser.Math.DegToRad(0);
                break;
              case 4:
                dice.modelRotation.x = Phaser.Math.DegToRad(180);
                dice.modelRotation.y = Phaser.Math.DegToRad(180);
                break;
              case 5:
                dice.modelRotation.x = Phaser.Math.DegToRad(-90);
                dice.modelRotation.y = Phaser.Math.DegToRad(0);
                break;
              case 6:
                dice.modelRotation.x = Phaser.Math.DegToRad(0);
                dice.modelRotation.y = Phaser.Math.DegToRad(90);
                break;
              case 0:
                //TODO: Remove dice
                break;
              default:
                break;
            }
          },
          ease: "Sine.easeInOut",
        });

        // Intro dice
        scene.add.tween({
          targets: [dice],
          scale: 1.2,
          duration: duration - 200,
          yoyo: true,
          ease: Phaser.Math.Easing.Quadratic.InOut,
          onComplete: () => {
            dice.scale = 1;
            if (callback !== undefined) {
              diceIsRolling = false;
              callback(diceRoll);
            }
          },
        });
      }
    };
  };

  class DiceScene extends Phaser.Scene {
    preload() {
      console.log(this)
      this.load.image("dice-albedo", "dice-albedo.png");
      this.load.obj("dice-obj", "dice.obj");
    }

    create() {
      const dice = createDice(
        this.scale.width / 2,
        this.scale.height / 2,
        this,
        1000
      );

      // Text object to show the dice value
      const textDiceValue = this.add.text(
        this.scale.width / 2,
        this.scale.height / 2,
        "0",
        { fontFamily: "Arial Black", fontSize: 74, color: "#c51b7d" }
      );
      textDiceValue.setStroke("#de77ae", 16).setScale(0);

      this.input.on("pointerdown", () => {
        dice((diceValue) => {
          console.log("Dice value ", diceValue);
          res(diceValue);

          // Show the dice value
          textDiceValue.text = diceValue;
          textDiceValue.setOrigin(0.5);
          textDiceValue.setPosition(
            this.scale.width / 2,
            this.scale.height / 4
          );

          this.add.tween({
            targets: textDiceValue,
            scale: 1,
            duration: 1000,
            ease: Phaser.Math.Easing.Bounce.Out,
            onComplete: () => {
              this.add.tween({
                targets: [textDiceValue],
                scale: 0,
                delay: 1000,
                duration: 1000,
                ease: Phaser.Math.Easing.Bounce.Out,
              });
            },
          });
        });
      });
    }
  }

  const config = {
    width: 150,
    height: 150,
    backgroundColor: "#1E5C3A",
    type: Phaser.WEBGL,
    parent: id,
    scene: DiceScene,
    tmp: (e) => alert(e),
  };
  const [game, setGame] = React.useState();

  React.useEffect(() => {
    const _game = new Phaser.Game(config);

    setGame(_game);

    return () => {
      _game.destroy(true);
      setGame(undefined);
    };
  }, []);
  return (
    <>
      <div id={id} />
    </>
  );
};

export default Die;
