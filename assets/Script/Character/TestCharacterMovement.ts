import {
  _decorator,
  Component,
  Input,
  input,
  KeyCode,
  lerp,
  Node,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("TestCharacterMovement")
export class TestCharacterMovement extends Component {
  deltatime;
  @property({ type: Number })
  speed = 5;
  start() {
    input.on(Input.EventType.KEY_PRESSING, this.keyBoardpress, this);
  }
  keyBoardpress(event) {
    console.log(
      "PRESSDED",
      "Position",
      this.node.getPosition(),
      "forword",
      this.node.forward
    );
    if (event.keyCode == KeyCode.ARROW_UP) {
      this.node.setPosition(
        this.node.getPosition().x -
          this.node.forward.x * this.deltatime * this.speed,
        this.node.getPosition().y,
        this.node.getPosition().z -
          this.node.forward.z * this.deltatime * this.speed
      );
    }
    if (event.keyCode == KeyCode.ARROW_DOWN) {
      this.node.setPosition(
        this.node.getPosition().x +
          this.node.forward.x * this.deltatime * this.speed,
        this.node.getPosition().y,
        this.node.getPosition().z +
          this.node.forward.z * this.deltatime * this.speed
      );
    }
  }
  update(deltaTime: number) {
    this.deltatime = deltaTime;
  }
}
