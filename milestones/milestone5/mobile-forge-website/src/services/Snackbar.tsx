import { createContext, useCallback, useContext, useRef, useState } from 'react';
import './Snackbar.css';

export type SnackbarType = 'success' | 'info' | 'error';

export interface SnackbarMessage {
  text: string;
  type: SnackbarType;
  id: number;
}

interface SnackbarContextValue {
  show: (text: string, type?: SnackbarType, duration?: number) => void;
  success: (text: string) => void;
  info: (text: string) => void;
  error: (text: string) => void;
  dismiss: (id: number) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<SnackbarMessage[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setMessages(msgs => msgs.filter(m => m.id !== id));
  }, []);

  const show = useCallback((text: string, type: SnackbarType = 'info', duration = 4000) => {
    const id = nextId.current++;
    setMessages(msgs => [...msgs, { text, type, id }]);
    setTimeout(() => dismiss(id), duration);
  }, [dismiss]);

  const success = useCallback((text: string) => show(text, 'success'), [show]);
  const info    = useCallback((text: string) => show(text, 'info'),    [show]);
  const error   = useCallback((text: string) => show(text, 'error'),   [show]);

  return (
    <SnackbarContext.Provider value={{ show, success, info, error, dismiss }}>
      {children}
      <div className="snackbar-container">
        {messages.map(msg => (
          <div key={msg.id} className={`snackbar snackbar-${msg.type}`}>
            <span className="snackbar-text">{msg.text}</span>
            <button className="snackbar-dismiss" onClick={() => dismiss(msg.id)}>✕</button>
          </div>
        ))}
      </div>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar(): SnackbarContextValue {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error('useSnackbar must be used within a SnackbarProvider');
  return ctx;
}
