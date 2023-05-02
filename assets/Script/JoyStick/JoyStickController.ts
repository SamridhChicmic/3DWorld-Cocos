import {
  _decorator,
  Component,
  Input,
  input,
  Node,
  Script,
  UITransform,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;
import { MovementAllDirection } from "../Character/MovementAllDirection";
@ccclass("JoyStickController")
export class JoyStickController extends Component {
  @property({ type: Node })
  JoyStick: Node = null;
  @property({ type: Node })
  JoyStickBall: Node = null;
  //   @property({ type: MovementAllDirection })
  //   Character: MovementAllDirection = null;
  JoyStickBallBaseWidth: number = 0;
  TouchUp: boolean = false;
  TouchDown: boolean = false;
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
        console.log("Forword");
        this.TouchDown = false;
        this.TouchUp = true;
      } else if (intialPos.y < 0) {
        this.TouchUp = false;
        this.TouchDown = true;
        console.log("backword");
      }
      this.JoyStickBall.setPosition(intialPos);
    }
  }
  onTouchStart() {
    console.log("TouchStart");
    this.JoyStickBall.setPosition(0, 0, 0);
    this.getComponent(MovementAllDirection).moveForWord();
  }
  onTouchEnd() {
    this.TouchUp = false;
    this.TouchDown = false;
    console.log("TouchEnd");
    this.JoyStickBall.setPosition(0, 0, 0);
  }

  update(deltaTime: number) {
    if (this.TouchUp == true) {
      console.log("TRue");
      this.getComponent(MovementAllDirection).moveForWord();
    }
  }
}
