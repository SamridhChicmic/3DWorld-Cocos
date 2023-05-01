import { _decorator, Component, Input, input, Node, Vec2, Vec3 } from "cc";
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
    console.log("LOGTOPDOWN", event.getDeltaY());
    let currentPosition = event.getLocation();
    let z = currentPosition.y - this.firstTouch.y;

    this.node.eulerAngles = new Vec3(
      this.node.eulerAngles.x + z * 0.005,
      this.node.eulerAngles.y,
      this.node.eulerAngles.z
    );
  }
  update(deltaTime: number) {}
}
