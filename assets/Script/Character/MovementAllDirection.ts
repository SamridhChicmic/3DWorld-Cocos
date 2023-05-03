import {
  _decorator,
  CCFloat,
  Component,
  Input,
  input,
  KeyCode,
  log,
  Node,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("MovementAllDirection")
export class MovementAllDirection extends Component {
  deltatime;
  @property({ type: CCFloat })
  speed = 15;
  ArrowUp: boolean = false;
  ArrowDown: boolean = false;
  start() {
    input.on(Input.EventType.KEY_DOWN, this.characterMovementKeyPress, this);
    input.on(
      Input.EventType.KEY_UP,
      () => {
        this.ArrowDown = false;
        this.ArrowUp = false;
      },
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
        this.ArrowUp = true;
        this.ArrowDown = false;
        break;
      case KeyCode.ARROW_DOWN:
        this.ArrowUp = false;
        this.ArrowDown = true;
        break;
    }
  }

  moveForWord() {
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
  }
  moveBackWord() {
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
  }
  update(deltaTime: number) {
    this.deltatime = deltaTime;
    if (this.ArrowUp == true) {
      this.moveForWord();
    }
    if (this.ArrowDown == true) {
      this.moveBackWord();
    }
  }
}
