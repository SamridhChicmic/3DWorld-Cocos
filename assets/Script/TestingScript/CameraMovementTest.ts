import { _decorator, Component, Input, input, Node, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CameraMovementTest")
export class CameraMovementTest extends Component {
  start() {
    input.on(
      Input.EventType.TOUCH_MOVE,
      (event) => {
        //  let Dx = event.getUILocation().y / 640 - 0.5;
        // console.log("DX", Dx);
        let Dy = event.getUILocation().x / 960 - 0.5;
        console.log("DX", Dy);
        this.node.eulerAngles = new Vec3(
          this.node.eulerAngles.x,
          this.node.eulerAngles.y + Dy * 3,
          this.node.eulerAngles.z
        );
      },
      this
    );
  }

  update(deltaTime: number) {}
}
