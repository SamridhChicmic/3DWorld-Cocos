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

@ccclass("CameraMovement")
export class CameraMovement extends Component {
  start() {
    input.on(Input.EventType.KEY_PRESSING, this.keyBoardPressed, this);
  }
  keyBoardPressed(event: EventKeyboard) {
    let currentPosition: Vec3;
    switch (event.keyCode) {
      case KeyCode.ARROW_UP:
        currentPosition = this.node.getPosition();
        currentPosition.z -= 0.1;
        // this.node.setPosition(currentPosition);
        tween(this.node)
          .to(0.1, {
            position: currentPosition,
          })
          .start();
        break;
      case KeyCode.ARROW_DOWN:
        currentPosition = this.node.getPosition();
        currentPosition.z += 0.1;
        // this.node.setPosition(currentPosition);
        tween(this.node)
          .to(0.1, {
            position: currentPosition,
          })
          .start();
        break;
      case KeyCode.ARROW_LEFT:
        currentPosition = this.node.getPosition();
        currentPosition.x -= 0.05;
        // this.node.setPosition(currentPosition);
        tween(this.node)
          .to(0.1, {
            position: currentPosition,
          })
          .start();
        break;
      case KeyCode.ARROW_RIGHT:
        currentPosition = this.node.getPosition();
        currentPosition.x += 0.05;
        // this.node.setPosition(currentPosition);
        //this.node.setPosition(this.CameraTracker.getWorldPosition());
        tween(this.node)
          .to(0.1, {
            position: currentPosition,
          })
          .start();

        break;
    }
  }
  update(deltaTime: number) {}
}
