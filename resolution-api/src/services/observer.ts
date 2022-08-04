declare global {
  interface Data {
    cid: string;
    f: number;
    t: string;
    v: number;
  }
}

type ObserverFn = (data: Data) => void;

class Observer {
  observers: ObserverFn[];

  constructor() {
    this.observers = [];
  }

  subscribe(f: ObserverFn) {
    this.observers.push(f);
  }

  unsubscribe(f: ObserverFn) {
    this.observers = this.observers.filter((subscriber) => subscriber !== f);
  }

  notify(data: Data) {
    this.observers.forEach((observer) => observer(data));
  }
}

const observer = new Observer();

export default observer;
