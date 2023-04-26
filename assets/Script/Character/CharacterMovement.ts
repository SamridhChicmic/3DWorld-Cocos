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
  start() {
    input.on(Input.EventType.KEY_PRESSING, this.keyBoardPressed, this);
    input.on(Input.EventType.KEY_DOWN, this.keyBoardDown, this);
  }
  keyBoardDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.ARROW_LEFT:
        let AngleLeft = this.node.eulerAngles;
        this.node.eulerAngles = new Vec3(
          AngleLeft.x,
          AngleLeft.y + 90,
          AngleLeft.z
        );

        break;
      case KeyCode.ARROW_RIGHT:
        let AngleRight = this.node.eulerAngles;
        this.node.eulerAngles = new Vec3(
          AngleRight.x,
          AngleRight.y - 90,
          AngleRight.z
        );
        break;
    }
  }
  keyBoardPressed(event: EventKeyboard) {
    let currentPosition: Vec3;
    switch (event.keyCode) {
      case KeyCode.ARROW_UP:
        currentPosition = this.node.getPosition();
        currentPosition.z -= 0.1;

        tween(this.node)
          .to(0.1, {
            eulerAngles: new Vec3(0, 180, 0),
            position: currentPosition,
          })
          .start();

        break;
      case KeyCode.ARROW_DOWN:
        currentPosition = this.node.getPosition();
        currentPosition.z += 0.1;

        tween(this.node)
          .to(0.1, {
            eulerAngles: new Vec3(0, 0, 0),
            position: currentPosition,
          })
          .start();

        break;
    }
  }
  update(deltaTime: number) {}
}
