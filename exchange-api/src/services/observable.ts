interface Data {
  callback: string;
  type: string;
  cid: string;
}

type Observer = (data: Data) => void;

class Observable {
  observers: Observer[];

  constructor() {
    this.observers = [];
  }

  subscribe(f: Observer) {
    this.observers.push(f);
  }

  notify(data: Data) {
    this.observers.forEach((observer) => observer(data));
  }
}

export default new Observable();
