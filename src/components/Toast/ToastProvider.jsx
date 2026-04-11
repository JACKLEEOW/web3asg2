import { createContext, useContext, useRef, useState } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);
    const [toastTick, setToastTick] = useState(0);
    const hideTimer = useRef(null);

    const showToast = (message, variant = 'info') => {
        clearTimeout(hideTimer.current);
        setToastTick((n) => n + 1);
        setToast({ message, variant });
        hideTimer.current = setTimeout(() => setToast(null), 4000);
    };

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            {toast && (
                <div
                    key={toastTick}
                    role="status"
                    className="toast-pop fixed bottom-6 right-6 z-200 max-w-sm rounded-lg px-4 py-3 text-sm font-medium shadow-lg"
                    style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        color: 'var(--text)',
                        boxShadow:
                            toast.variant === 'error'
                                ? 'inset 3px 0 0 0 #fb7c7c, 0 8px 24px rgba(0,0,0,0.35)'
                                : toast.variant === 'success'
                                  ? 'inset 3px 0 0 0 var(--accent), 0 8px 24px rgba(0,0,0,0.35)'
                                  : 'inset 3px 0 0 0 var(--muted), 0 8px 24px rgba(0,0,0,0.35)',
                    }}
                >
                    {toast.message}
                </div>
            )}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const showToast = useContext(ToastContext);
    if (!showToast) throw new Error('useToast must be used within ToastProvider');
    return { showToast };
}
