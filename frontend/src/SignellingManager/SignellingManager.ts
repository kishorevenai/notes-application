import { IncomeMessage } from "../types";

export const BASE_URL = "ws://localhost:3600";

export class SignellingManager {
  private ws: WebSocket;
  static instance: SignellingManager;
  private bufferMessage: any[];
  private callbacks: any = {};
  private id: Number = 0;
  public initialized: Boolean = false;

  constructor() {
    this.ws = new WebSocket(BASE_URL);
    this.bufferMessage = [];
    this.id = 1;
    this.init();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new SignellingManager();
    }
    return this.instance;
  }

  init() {
    this.ws.onopen = () => {
      this.initialized = true;
      this.bufferMessage.forEach((message) => {
        this.ws.send(JSON.stringify(message));
      });
      this.bufferMessage = [];
    };

    this.ws.onmessage = (event) => {
      console.log(JSON.parse(event.data));
      const message = JSON.parse(event.data);

      if (message.type === "ACTIVEUSERS") {
        this.callbacks[message.type].map((callback) => {
          callback(message.users);
        });
      }
    };
  }

  sendMessage(message: IncomeMessage) {
    if (!this.initialized) {
      this.bufferMessage.push(message);
      return;
    }
    this.ws.send(JSON.stringify(message));
  }

  registerCallback(registory: { type: string; callback: (data) => void }) {
    this.callbacks[registory.type] = this.callbacks[registory.type] || [];
    this.callbacks[registory.type].push(registory.callback);
  }
}
