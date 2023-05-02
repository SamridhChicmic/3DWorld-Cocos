import {
  _decorator,
  CCFloat,
  Component,
  Input,
  input,
  KeyCode,
  Node,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("MovementAllDirection")
export class MovementAllDirection extends Component {
  deltatime;
  @property({ type: CCFloat })
  speed = 0.00015;
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
        let CharacterPosition = new Vec3();
        let Destination = new Vec3();
        Destination.x =
          this.node.getPosition().x -
          this.node.forward.x * this.deltatime * this.speed;
        Destination.y = this.node.getPosition().y;
        Destination.z =
          this.node.getPosition().z -
          this.node.forward.z * this.deltatime * this.speed;
        Vec3.lerp(CharacterPosition, this.node.getPosition(), Destination, 0.5);
        this.node.setPosition(CharacterPosition);
        break;
      case KeyCode.ARROW_DOWN:
        let CharacterPositionDown = new Vec3();
        let DestinationDown = new Vec3();
        DestinationDown.x =
          this.node.getPosition().x +
          this.node.forward.x * this.deltatime * this.speed;
        DestinationDown.y = this.node.getPosition().y;
        DestinationDown.z =
          this.node.getPosition().z +
          this.node.forward.z * this.deltatime * this.speed;
        Vec3.lerp(
          CharacterPositionDown,
          this.node.getPosition(),
          DestinationDown,
          0.5
        );
        this.node.setPosition(CharacterPositionDown);
        break;
    }
  }
  update(deltaTime: number) {
    this.deltatime = deltaTime;
  }
}
