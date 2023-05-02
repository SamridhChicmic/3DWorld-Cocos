import { _decorator, Component, Input, input, KeyCode, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("MovementAllDirection")
export class MovementAllDirection extends Component {
  deltatime;
  @property({ type: Number })
  speed: number = 5;
  start() {
    input.on(
      Input.EventType.KEY_PRESSING,
      this.characterMovementKeyPress,
      this
    );
  }
  /**
   *
   * @des Handling of character Movement
   *
   */
  characterMovementKeyPress(event) {
    // this.node.forword tell where character facing / tell forword facing vector

    switch (event.keyCode) {
      case KeyCode.ARROW_UP:
        this.node.setPosition(
          this.node.getPosition().x -
            this.node.forward.x * this.deltatime * this.speed,
          this.node.getPosition().y,
          this.node.getPosition().z -
            this.node.forward.z * this.deltatime * this.speed
        );
        break;
      case KeyCode.ARROW_DOWN:
        this.node.setPosition(
          this.node.getPosition().x +
            this.node.forward.x * this.deltatime * this.speed,
          this.node.getPosition().y,
          this.node.getPosition().z +
            this.node.forward.z * this.deltatime * this.speed
        );
        break;
    }
  }
  update(deltaTime: number) {
    this.deltatime = deltaTime;
  }
}
