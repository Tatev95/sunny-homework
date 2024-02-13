type Listener = {
    id: string;
    cb: Function;
}

type ListenerInfo = {
    [key: string]: Listener[];
}

class EventEmitter {

    listeners: ListenerInfo = {}

    on(event: string, listerner: Function) {
        const id = Math.random().toString(36).substring(2, 9)
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }
        this.listeners[event].push({ id, cb: listerner })

        return () => {
            this.off(event, id)
        }

    }

    emit(event: string, data: any) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(listener => {
                listener.cb(data)
            })
        }
    }

    private off(event: string, listenerId: string) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(listener => listener.id !== listenerId)
        }
    }

}

export default EventEmitter
