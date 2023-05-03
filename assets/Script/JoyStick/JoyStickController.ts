import {
  _decorator,
  CCFloat,
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
  @property({ type: Node })
  Character: Node = null;
  @property({ type: CCFloat })
  speed = 15;
  JoyStickBallBaseWidth: number = 0;
  TouchUp: boolean = false;
  TouchDown: boolean = false;
  deltatime: number;
  start() {
    this.JoyStickBallBaseWidth =
      this.JoyStick.getComponent(UITransform).width * 0.5;

    this.joyStickControllerTouch();
  }
  joyStickControllerTouch() {
    this.JoyStickBall.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    this.JoyStickBall.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.JoyStickBall.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    this.JoyStickBall.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
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
  }
  onTouchEnd() {
    this.TouchUp = false;
    this.TouchDown = false;
    console.log("TouchEnd");
    this.JoyStickBall.setPosition(0, 0, 0);
  }
  moveForWord() {
    let CharacterPosition = new Vec3();
    let Destination = new Vec3();

    Destination.x =
      this.Character.getPosition().x -
      this.Character.forward.x * this.deltatime * this.speed;
    Destination.y = this.Character.getPosition().y;
    Destination.z =
      this.Character.getPosition().z -
      this.Character.forward.z * this.deltatime * this.speed;
    Vec3.lerp(
      CharacterPosition,
      this.Character.getPosition(),
      Destination,
      0.5
    );

    this.Character.setPosition(CharacterPosition);
  }
  moveBackWord() {
    let CharacterPositionDown = new Vec3();
    let DestinationDown = new Vec3();
    DestinationDown.x =
      this.Character.getPosition().x +
      this.Character.forward.x * this.deltatime * this.speed;
    DestinationDown.y = this.Character.getPosition().y;
    DestinationDown.z =
      this.Character.getPosition().z +
      this.Character.forward.z * this.deltatime * this.speed;
    Vec3.lerp(
      CharacterPositionDown,
      this.Character.getPosition(),
      DestinationDown,
      0.5
    );
    this.Character.setPosition(CharacterPositionDown);
  }
  update(deltaTime: number) {
    this.deltatime = deltaTime;
    if (this.TouchUp == true) {
      this.moveForWord();
    }
    if (this.TouchDown == true) {
      this.moveBackWord();
    }
  }
}
