import { createContext, useCallback, useContext, useRef, useState } from 'react';
import './ConfirmModal.css';

export interface ConfirmModalConfig {
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
}

interface ConfirmModalContextValue {
  open: (config: ConfirmModalConfig) => Promise<boolean>;
}

const ConfirmModalContext = createContext<ConfirmModalContextValue | null>(null);

export function ConfirmModalProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ConfirmModalConfig & { confirmLabel: string; danger: boolean } | null>(null);
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const open = useCallback((cfg: ConfirmModalConfig): Promise<boolean> => {
    setConfig({ confirmLabel: 'confirm', danger: false, ...cfg });
    return new Promise(resolve => { resolveRef.current = resolve; });
  }, []);

  function confirm() {
    setConfig(null);
    resolveRef.current?.(true);
  }

  function dismiss() {
    setConfig(null);
    resolveRef.current?.(false);
  }

  return (
    <ConfirmModalContext.Provider value={{ open }}>
      {children}
      {config && (
        <div className="modal-backdrop" onClick={dismiss}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">{config.title}</h3>
            <p className="modal-message">{config.message}</p>
            <div className="modal-actions">
              <button className="modal-btn-outline" onClick={dismiss}>cancel</button>
              <button className={`modal-btn-dark${config.danger ? ' danger' : ''}`} onClick={confirm}>
                {config.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmModalContext.Provider>
  );
}

export function useConfirmModal(): ConfirmModalContextValue {
  const ctx = useContext(ConfirmModalContext);
  if (!ctx) throw new Error('useConfirmModal must be used within a ConfirmModalProvider');
  return ctx;
}
