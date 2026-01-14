/// <reference types="vite/client" />

declare namespace JSX {
    interface IntrinsicElements {
        'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            src?: string;
            poster?: string;
            alt?: string;
            ar?: boolean;
            'ar-modes'?: string;
            'camera-controls'?: boolean;
            'auto-rotate'?: boolean;
            'shadow-intensity'?: string;
            slot?: string; // Importante para o botão AR
        };
    }
}