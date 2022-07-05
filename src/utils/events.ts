export function on(eventType: string, listener: (e: CustomEvent) => void) {
  document.addEventListener(eventType, listener as EventListener);
}

export function off(eventType: string, listener: (e: CustomEvent) => void) {
  document.removeEventListener(eventType, listener as EventListener);
}

export function trigger(eventType: string, data?: Object) {
  const event = new CustomEvent(eventType, { detail: data });
  document.dispatchEvent(event);
}
