
import React from 'react';
import { X } from 'lucide-react';

function Modal({ title, children, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-2xl overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center p-5 border-b border-zinc-800">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-zinc-400 hover:text-white transition">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-5">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
