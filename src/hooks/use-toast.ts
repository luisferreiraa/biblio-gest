import { useState, useEffect } from "react";

interface ToastProps {
    title: string;
    description?: string;
    variant?: 'default' | 'destructive' | 'success';
    duration?: number;
}

export function toast(props: ToastProps) {
    // Esta é uma implementação simplificada
    // Num projeto real, você pode usar uma lib como react-toastify

    const toastEvent = new CustomEvent('toast', { detail: props });
    window.dispatchEvent(toastEvent);
}

export function useToast() {
    const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([]);

    useEffect(() => {
        const handleToast = (event: CustomEvent<ToastProps>) => {
            const id = Math.random().toString(36).substring(2, 9);
            const newToast = { ...event.detail, id };

            setToasts((prev) => [...prev, newToast]);

            // Auto-dismiss
            setTimeout(() => {
                setToasts(prev => prev.filter(toast => toast.id !== id));
            }, e.detail.duration || 5000);
        };

        window.addEventListener('toast' as any, handleToast as any);
        return () => window.removeEventListener('toast' as any, handleToast as any);
    }, []);

    return { toasts, dismiss: (id: string) => setToasts(prev => prev.filter(toast => toast.id !== id)) };
}