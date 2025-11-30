const GameEvent = {
    System: 'system',
    Highscore: 'highscore'
};

class EventMessage {
    constructor(from, type, value, game) {
        this.from = from;
        this.type = type;
        this.value = value;
        this.game = game;
    }
}

class GameEventNotifier {
    events = [];
    handlers = [];

    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onopen = (event) => {
            this.receiveEvent(new EventMessage('Startup', GameEvent.System, { msg: 'connected' }));
        };
        this.socket.onclose = (event) => {
            this.receiveEvent(new EventMessage('Startup', GameEvent.System, { msg: 'disconnected' }));
        };
        this.socket.onmessage = async (msg) => {
            try {
                const event = JSON.parse(await msg.data.text());
                this.receiveEvent(event);
            } catch { }
        };
    }

    broadcastEvent(from, type, value, game) {
        const event = new EventMessage(from, type, value, game);
        this.socket.send(JSON.stringify(event));
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers.filter((h) => h !== handler);
    }

    receiveEvent(event) {
        this.events.push(event);

        this.events.forEach((e) => {
            this.handlers.forEach((handler) => {
                handler(e);
            });
        });
    }
}

const GameNotifier = new GameEventNotifier();
export { GameEvent, GameNotifier };