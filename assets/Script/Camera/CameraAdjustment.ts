import { _decorator, Component, Input, input, Node, Vec2, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CameraAdjustment")
export class CameraAdjustment extends Component {
  FirstTouch: Vec2 = null;
  start() {
    input.on(Input.EventType.TOUCH_MOVE, this.mouseMove, this);
    input.on(
      Input.EventType.TOUCH_START,
      (event) => {
        this.FirstTouch = event.getLocation();
      },
      this
    );
  }
  mouseMove(event) {
    let ratio = 0.005;

    let currentPosition = event.getLocation();
    let z = currentPosition.x - this.FirstTouch.x;

    this.node.eulerAngles = new Vec3(
      this.node.eulerAngles.x,
      this.node.eulerAngles.y + z * ratio,
      this.node.eulerAngles.z
    );
  }
  update(deltaTime: number) {}
}
