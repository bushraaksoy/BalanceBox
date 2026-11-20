import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import FullLogo from '../components/FullLogo';

const points = [
    {
        title: 'Balance',
        text: 'See what is left across your cards.',
    },
    {
        title: 'Income and expenses',
        text: 'Record money in and money out as it happens.',
    },
    {
        title: 'Budgeting',
        text: 'Choose a limit, then stay inside it.',
    },
];

const installSteps = () => {
    const ua = navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(ua)) {
        return [
            'Tap the Share button in Safari.',
            'Tap Add to Home Screen.',
            'Tap Add.',
        ];
    }
    if (/Android/.test(ua)) {
        return [
            'Tap the menu button in Chrome.',
            'Tap Install app, or Add to Home screen.',
            'Confirm.',
        ];
    }
    return [
        'Open balancebox.online on your phone to get the mobile app.',
        'On iPhone, tap Share, then Add to Home Screen.',
        'On Android, tap the Chrome menu, then Install app or Add to Home screen.',
    ];
};

const Landing = () => {
    const [installOpen, setInstallOpen] = useState(false);
    const [steps, setSteps] = useState([]);

    useEffect(() => {
        if (!installOpen) return undefined;
        const onKey = (event) => {
            if (event.key === 'Escape') setInstallOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [installOpen]);

    const openInstall = () => {
        setSteps(installSteps());
        setInstallOpen(true);
    };

    return (
        <div
            className="relative isolate min-h-screen bg-[#f4f3f0] text-stone-900 flex flex-col"
            style={{ fontFamily: 'Poppins, Arial' }}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    backgroundImage:
                        'radial-gradient(rgba(87, 83, 78, 0.28) 1.15px, transparent 1.15px)',
                    backgroundSize: '20px 20px',
                    maskImage:
                        'linear-gradient(to bottom, transparent 0, black 72px, black calc(100% - 72px), transparent 100%)',
                    WebkitMaskImage:
                        'linear-gradient(to bottom, transparent 0, black 72px, black calc(100% - 72px), transparent 100%)',
                }}
            />
            <header className="sticky top-0 z-10 flex items-center justify-between px-6 sm:px-10 h-16 bg-[#f4f3f0]/80 backdrop-blur border-b border-stone-200/80">
                <FullLogo />
                <Link to="/login" className="text-sm font-medium">
                    Login
                </Link>
            </header>

            <main className="flex-1">
                <section className="max-w-2xl mx-auto px-6 pt-14 sm:pt-16 pb-12 text-center">
                    <p className="text-sm font-medium text-stone-500">
                        Personal finance
                    </p>
                    <h1 className="mt-3 text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05]">
                        Know what you can spend.
                    </h1>
                    <p className="mt-5 text-lg text-stone-500">
                        BalanceBox keeps your cards, income, and expenses in
                        one quiet place.
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-3">
                        <Link
                            to="/register"
                            className="rounded-full bg-yellow-500 px-5 py-2.5 text-sm font-semibold"
                        >
                            Get started
                        </Link>
                        <button
                            type="button"
                            onClick={openInstall}
                            className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium"
                        >
                            Get the mobile app
                        </button>
                    </div>
                    <p className="mt-3 text-xs text-stone-400">
                        The mobile app is for your phone.
                    </p>
                </section>

                <section className="max-w-4xl mx-auto px-6 pb-12">
                    <div className="grid sm:grid-cols-3 border border-stone-200 rounded-2xl overflow-hidden bg-white">
                        {points.map((point) => (
                            <div
                                key={point.title}
                                className="p-6 sm:p-8 border-b sm:border-b-0 sm:border-r last:border-0 border-stone-200"
                            >
                                <h2 className="font-medium">{point.title}</h2>
                                <p className="mt-2 text-sm text-stone-500 leading-6">
                                    {point.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="max-w-2xl mx-auto px-6 pb-16 text-center">
                    <p className="text-stone-500">Ready when you are.</p>
                    <Link
                        to="/register"
                        className="mt-5 inline-flex rounded-full bg-yellow-500 px-5 py-2.5 text-sm font-semibold"
                    >
                        Get started
                    </Link>
                </section>
            </main>

            <footer className="px-6 sm:px-10 py-8 text-sm text-stone-400">
                BalanceBox
            </footer>

            {installOpen && (
                <div
                    className="fixed inset-0 z-20 flex items-end sm:items-center justify-center bg-stone-900/40 p-4"
                    onClick={() => setInstallOpen(false)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="install-title"
                        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <h2
                                id="install-title"
                                className="text-lg font-semibold tracking-tight"
                            >
                                Add the mobile app to your home screen
                            </h2>
                            <button
                                type="button"
                                onClick={() => setInstallOpen(false)}
                                className="text-sm text-stone-500"
                                aria-label="Close"
                            >
                                Close
                            </button>
                        </div>
                        <p className="mt-2 text-sm text-stone-500">
                            The mobile app is for your phone.
                        </p>
                        <ol className="mt-5 flex flex-col gap-3">
                            {steps.map((step, index) => (
                                <li key={step} className="flex gap-3 text-sm">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-500 text-xs font-semibold">
                                        {index + 1}
                                    </span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Landing;
