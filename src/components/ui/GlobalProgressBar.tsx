'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function GlobalProgressBar() {
    return (
        <ProgressBar
            height="3px"
            color="#d4af37" // VSOE Gold
            options={{ showSpinner: false }}
            shallowRouting={true}
        />
    );
}
