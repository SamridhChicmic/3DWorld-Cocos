import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("JoyStickController")
export class JoyStickController extends Component {
  start() {}
  onTouch() {
    console.log("Hello");
  }
  update(deltaTime: number) {}
}
