'use client';

import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

export function Toaster() {
    const { toasts, dismiss } = useToast();

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className={`p-4 rounded-md shadow-md flex items-start justify-between ${toast.variant === 'destructive'
                        ? 'bg-red-100 text-red-800 border-l-4 border-red-500'
                        : toast.variant === 'success'
                            ? 'bg-green-100 text-green-800 border-l-4 border-green-500'
                            : 'bg-white text-gray-800 border-l-4 border-blue-500'
                        }`}
                >
                    <div>
                        <h3 className="font-medium">{toast.title}</h3>
                        {toast.description && <p className="text-sm mt-1">{toast.description}</p>}
                    </div>
                    <button
                        onClick={() => dismiss(toast.id)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={18} />
                    </button>
                </div>
            ))}
        </div>
    );
}