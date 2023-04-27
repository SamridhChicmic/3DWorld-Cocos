import {
  _decorator,
  Component,
  EventKeyboard,
  Input,
  input,
  KeyCode,
  Node,
  Quat,
  SkeletalAnimation,
  tween,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("CharacterMovement")
export class CharacterMovement extends Component {
  @property({ type: Node })
  Plane: Node = null;
  AxisArray = ["-z", "x", "z", "-x"];
  index: number = 0;
  start() {
    input.on(Input.EventType.KEY_PRESSING, this.keyBoardPressed, this);
    input.on(Input.EventType.KEY_DOWN, this.keyBoardDown, this);
  }
  keyBoardDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.ARROW_LEFT:
        this.index--;
        if (this.index < 0) this.index = 3;
        this.index = this.index % 4;
        let AngleLeft = this.node.eulerAngles;

        tween(this.node)
          .to(0.5, {
            eulerAngles: new Vec3(AngleLeft.x, AngleLeft.y + 90, AngleLeft.z),
          })
          .start();
        break;
      case KeyCode.ARROW_RIGHT:
        this.index++;
        this.index = Math.abs(this.index) % 4;
        let AngleRight = this.node.eulerAngles;
        tween(this.node)
          .to(0.5, {
            eulerAngles: new Vec3(
              AngleRight.x,
              AngleRight.y - 90,
              AngleRight.z
            ),
          })
          .start();

        break;
    }
  }
  keyBoardPressed(event: EventKeyboard) {
    let currentPosition: Vec3;
    switch (event.keyCode) {
      case KeyCode.ARROW_UP:
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
        break;
      case KeyCode.ARROW_DOWN:
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
        break;
    }
  }
  update(deltaTime: number) {}
}
