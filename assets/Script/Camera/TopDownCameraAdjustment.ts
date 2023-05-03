import {
  _decorator,
  Component,
  Input,
  input,
  math,
  Node,
  quat,
  Vec2,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("TopDownCameraAdjustment")
export class TopDownCameraAdjustment extends Component {
  firstTouch: Vec2 = null;
  start() {
    input.on(Input.EventType.TOUCH_MOVE, this.mouseMoveTopDown, this);
    input.on(
      Input.EventType.TOUCH_START,
      (event) => {
        this.firstTouch = event.getLocation();
      },
      this
    );
  }
  mouseMoveTopDown(event) {
    let currentPosition = event.getLocation();
    let z = currentPosition.y - this.firstTouch.y;
    if (this.node.eulerAngles.x < 100 && this.node.eulerAngles.x > -100) {
      this.node.eulerAngles = new Vec3(
        this.node.eulerAngles.x + z * 0.0005,
        this.node.eulerAngles.y,
        this.node.eulerAngles.z
      );
    }
  }
  update(deltaTime: number) {}
}
