import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';

const appName = import.meta.env.VITE_APP_NAME || 'SparkWash';

// Page Transition Wrapper
function PageTransition({ children }: { children: React.ReactNode }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 10);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            style={{
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
        >
            {children}
        </div>
    );
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx', { eager: false }),
        );
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <PageTransition>
                <App {...props} />
            </PageTransition>
        );
    },
    progress: {
        color: '#38bdf8',
        showSpinner: true,
    },
});