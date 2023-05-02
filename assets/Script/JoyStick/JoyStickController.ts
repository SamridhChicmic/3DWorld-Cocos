import {
  _decorator,
  Component,
  Input,
  input,
  Node,
  UITransform,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("JoyStickController")
export class JoyStickController extends Component {
  @property({ type: Node })
  JoyStick: Node = null;
  @property({ type: Node })
  JoyStickBall: Node = null;

  JoyStickBallBaseWidth: number = 0;
  start() {
    this.JoyStickBallBaseWidth =
      this.JoyStick.getComponent(UITransform).width * 0.5;
    console.log(this.JoyStickBallBaseWidth);
    this.joyStickControllerTouch();
  }
  joyStickControllerTouch() {
    this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
  }
  onTouchMove(event) {
    let intialPos = this.JoyStick.getComponent(
      UITransform
    ).convertToNodeSpaceAR(
      new Vec3(
        event.getUILocation().x,
        event.getUILocation().y,
        event.getUILocation().z
      )
    );

    if (
      intialPos.y <= this.JoyStickBallBaseWidth &&
      intialPos.x <= this.JoyStickBallBaseWidth &&
      intialPos.y >= -this.JoyStickBallBaseWidth &&
      intialPos.x >= -this.JoyStickBallBaseWidth
    ) {
      if (intialPos.y > 0) {
        console.log("Runnforword");
      } else if (intialPos.y < 0) {
        console.log("backword");
      }
      this.JoyStickBall.setPosition(intialPos);
    }
  }
  onTouchStart() {
    console.log("TouchStart");
    this.JoyStickBall.setPosition(0, 0, 0);
  }
  onTouchEnd() {
    console.log("TouchEnd");
    this.JoyStickBall.setPosition(0, 0, 0);
  }
  onTouch() {
    console.log("Hello");
  }
  update(deltaTime: number) {}
}
