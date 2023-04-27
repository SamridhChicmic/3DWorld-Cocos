import {
  _decorator,
  Component,
  EventKeyboard,
  Input,
  input,
  KeyCode,
  Node,
  tween,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("testmovement")
export class testmovement extends Component {
  AxisArray = ["-z", "-zx", "x", "xz", "z", "z-x", "-x", "-x-z"];
  index: number = 0;
  start() {
    input.on(Input.EventType.KEY_PRESSING, this.keyBoardPressed, this);
    input.on(Input.EventType.KEY_DOWN, this.keyBoardDown, this);
    console.log(-1 % 180);
  }
  keyBoardDown(event: EventKeyboard) {
    let currentPosition: Vec3;
    switch (event.keyCode) {
      case KeyCode.ARROW_UP:
        this.keyPressUP();
        break;
      case KeyCode.ARROW_DOWN:
        this.keyPressDown();
        break;
      case KeyCode.ARROW_LEFT:
        let AngleLeft = this.node.eulerAngles;
        AngleLeft = new Vec3(AngleLeft.x, AngleLeft.y % 360, AngleLeft.z);
        if (AngleLeft.y == 180) {
          this.index = 0;
          console.log("Axis", this.AxisArray[this.index]);
        }
        if (270 > AngleLeft.y && AngleLeft.y > 180) {
          this.index = 7;
          console.log("Axis", this.AxisArray[this.index]);
        }
        if (AngleLeft.y == 270) {
          this.index = 6;
          AngleLeft = new Vec3(AngleLeft.x, -90, AngleLeft.z);
          console.log("Axis", this.AxisArray[this.index]);
        }
        if (-90 < AngleLeft.y && AngleLeft.y < 0) {
          this.index = 5;
          console.log("Axis", this.AxisArray[this.index]);
        }
        if (AngleLeft.y == 0) {
          this.index = 4;
          console.log("Axis", this.AxisArray[this.index]);
        }
        if (0 < AngleLeft.y && AngleLeft.y < 90) {
          this.index = 3;
          console.log("Axis", this.AxisArray[this.index]);
        }
        if (AngleLeft.y == 90) {
          this.index = 2;
          console.log("Axis", this.AxisArray[this.index]);
        }
        if (90 < AngleLeft.y && AngleLeft.y < 180) {
          this.index = 1;
          console.log("Axis", this.AxisArray[this.index]);
        }
        tween(this.node)
          .to(0.5, {
            eulerAngles: new Vec3(AngleLeft.x, AngleLeft.y + 10, AngleLeft.z),
          })

          .start();
        break;
      case KeyCode.ARROW_RIGHT:
        let AngleRight = this.node.eulerAngles;
        AngleRight = new Vec3(AngleRight.x, AngleRight.y % 360, AngleRight.z);
        if (180 > AngleRight.y && AngleRight.y > 90) {
          this.index = 1;
          console.log("Axis", this.AxisArray[this.index]);
        }
        if (AngleRight.y == 90) {
          this.index = 2;
          console.log("Axis", this.AxisArray[this.index]);
        }
        if (90 > AngleRight.y && AngleRight.y > 0) {
          this.index = 3;
          console.log("Axis", this.AxisArray[this.index]);
        }
        if (AngleRight.y == 0) {
          this.index = 4;
          console.log("Axis", this.AxisArray[this.index]);
        }
        if (0 > AngleRight.y && AngleRight.y > -90) {
          this.index = 5;
          console.log("Axis", this.AxisArray[this.index]);
        }
        if (AngleRight.y == -90) {
          this.index = 6;
          AngleRight = new Vec3(AngleRight.x, 270, AngleRight.z);
          console.log("Axis", this.AxisArray[this.index]);
        }
        if (270 > AngleRight.y && AngleRight.y > 180) {
          this.index = 7;
          console.log("Axis", this.AxisArray[this.index]);
        }
        tween(this.node)
          .to(0.5, {
            eulerAngles: new Vec3(
              AngleRight.x,
              AngleRight.y - 10,
              AngleRight.z
            ),
          })

          .start();

        break;
    }
  }
  keyBoardPressed(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.ARROW_UP:
        this.keyPressUP();
        break;
      case KeyCode.ARROW_DOWN:
        this.keyPressDown();
        break;
    }
  }
  /**
   * @description Forword Movement of character When UP Arrow Press
   */
  keyPressUP() {
    let currentPosition: Vec3;
    if (this.AxisArray[this.index] == "-z") {
      currentPosition = this.node.getPosition();
      currentPosition.z -= 0.5;

      tween(this.node).to(0.1, { position: currentPosition }).start();
    }
    if (this.AxisArray[this.index] == "z") {
      currentPosition = this.node.getPosition();
      currentPosition.z += 0.5;

      tween(this.node).to(0.1, { position: currentPosition }).start();
    }
    if (this.AxisArray[this.index] == "x") {
      currentPosition = this.node.getPosition();
      currentPosition.x += 0.5;

      tween(this.node).to(0.1, { position: currentPosition }).start();
    }
    if (this.AxisArray[this.index] == "-x") {
      currentPosition = this.node.getPosition();
      currentPosition.x -= 0.5;

      tween(this.node).to(0.1, { position: currentPosition }).start();
    }
    if (this.AxisArray[this.index] == "-zx") {
      console.log(" Console -zx");
      currentPosition = this.node.getPosition();
      currentPosition.x += 0.5;
      currentPosition.z -= 0.5;

      tween(this.node).to(0.1, { position: currentPosition }).start();
    }
    if (this.AxisArray[this.index] == "xz") {
      console.log(" Console xz");
      currentPosition = this.node.getPosition();
      currentPosition.x += 0.5;
      currentPosition.z += 0.5;
      tween(this.node).to(0.1, { position: currentPosition }).start();
    }
    if (this.AxisArray[this.index] == "z-x") {
      console.log(" Console z-x");
      currentPosition = this.node.getPosition();
      currentPosition.x -= 0.5;
      currentPosition.z += 0.5;
      tween(this.node).to(0.1, { position: currentPosition }).start();
    }
    if (this.AxisArray[this.index] == "-x-z") {
      console.log(" Console -x-z");
      currentPosition = this.node.getPosition();
      currentPosition.x -= 0.5;
      currentPosition.z -= 0.5;
      tween(this.node).to(0.1, { position: currentPosition }).start();
    }
  }
  /**
   * @description Backword Movement of character When UP Arrow Press
   */
  keyPressDown() {
    let currentPosition: Vec3;
    if (this.AxisArray[this.index] == "-z") {
      currentPosition = this.node.getPosition();
      currentPosition.z += 0.5;

      tween(this.node).to(0.1, { position: currentPosition }).start();
    }
    if (this.AxisArray[this.index] == "z") {
      currentPosition = this.node.getPosition();
      currentPosition.z -= 0.5;

      tween(this.node).to(0.1, { position: currentPosition }).start();
    }
    if (this.AxisArray[this.index] == "x") {
      currentPosition = this.node.getPosition();
      currentPosition.x -= 0.5;

      tween(this.node).to(0.1, { position: currentPosition }).start();
    }
    if (this.AxisArray[this.index] == "-x") {
      currentPosition = this.node.getPosition();
      currentPosition.x += 0.5;

      tween(this.node).to(0.1, { position: currentPosition }).start();
    }
  }
}
