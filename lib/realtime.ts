type Listener<T> = (data: T) => void;

class Hub {
  private channels = new Map<string, Set<Listener<any>>>();

  subscribe<T>(channel: string, listener: Listener<T>) {
    if (!this.channels.has(channel)) this.channels.set(channel, new Set());
    this.channels.get(channel)!.add(listener);
    return () => this.channels.get(channel)!.delete(listener);
  }

  publish<T>(channel: string, data: T) {
    const listeners = this.channels.get(channel);
    if (!listeners) return;
    listeners.forEach((l) => l(data));
  }
}

declare global {
  // eslint-disable-next-line no-var
  var __realtimeHub: Hub | undefined;
}

export const realtimeHub = global.__realtimeHub ?? new Hub();
if (process.env.NODE_ENV !== "production") global.__realtimeHub = realtimeHub;

