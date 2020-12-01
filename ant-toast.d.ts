declare const toast: {
    success: (content: any, duration?: number) => Promise<void>;
    error: (content: any, duration?: number) => Promise<void>;
    info: (content: any, duration?: number) => Promise<void>;
    warning: (content: any, duration?: number) => Promise<void>;
    warn: (content: any, duration?: number) => Promise<void>;
    loading: (content: any, duration?: number) => Promise<void>;
    destroy: () => void;
};
export default toast;
