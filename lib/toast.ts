/**
 * Toast 싱글턴 — v26의 window.__toast 대응.
 * 어디서든 toast(msg, type) 호출 → layout에 1개 마운트된 <Toast/>가 표시.
 */
export type ToastType = "success" | "error";
type Listener = (msg: string, type: ToastType) => void;

const listeners = new Set<Listener>();

export function subscribeToast(l: Listener): () => void {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

export function toast(msg: string, type: ToastType = "success"): void {
  listeners.forEach((l) => l(msg, type));
}
