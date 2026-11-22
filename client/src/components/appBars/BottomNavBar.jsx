import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHouse, FaSackDollar } from 'react-icons/fa6';
import { FaUserAlt } from 'react-icons/fa';
import { IoMdAnalytics } from 'react-icons/io';
import { GiWallet } from 'react-icons/gi';

const tabs = [
    { title: 'Home', to: '/', icon: FaHouse },
    { title: 'Activity', to: '/activity', icon: FaSackDollar },
    { title: 'Budgeting', to: '/budgeting', icon: GiWallet },
    { title: 'Analytics', to: '/analytics', icon: IoMdAnalytics },
    { title: 'Account', to: '/account', icon: FaUserAlt },
];

const slide =
    'transform 320ms cubic-bezier(0.32, 0.72, 0, 1), width 320ms cubic-bezier(0.32, 0.72, 0, 1), height 320ms cubic-bezier(0.32, 0.72, 0, 1)';

let lastPill = null;

const measurePill = (row) => {
    const link = row.querySelector("[aria-current='page']");
    if (!link) return null;
    const rowBox = row.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    return {
        x: linkBox.left - rowBox.left - row.clientLeft,
        y: linkBox.top - rowBox.top - row.clientTop,
        w: linkBox.width,
        h: linkBox.height,
    };
};

const BottomNavBar = () => {
    const location = useLocation();
    const rowRef = useRef(null);
    const [pill, setPill] = useState(lastPill);
    const [motionOn, setMotionOn] = useState(Boolean(lastPill));

    useEffect(() => {
        const row = rowRef.current;
        if (!row) return undefined;

        const next = measurePill(row);
        if (!next) {
            lastPill = null;
            setPill(null);
            setMotionOn(false);
            return undefined;
        }

        let observer = null;
        const timer = setTimeout(() => {
            lastPill = next;
            setMotionOn(true);
            setPill(next);
            observer = new ResizeObserver(() => {
                const resized = measurePill(row);
                if (!resized) return;
                lastPill = resized;
                setPill(resized);
            });
            observer.observe(row);
        }, 0);

        return () => {
            clearTimeout(timer);
            observer?.disconnect();
        };
    }, [location.pathname]);

    return (
        <div
            className="pointer-events-none absolute inset-x-6 z-20"
            style={{
                bottom: 'max(0.25rem, calc(env(safe-area-inset-bottom, 0px) - 0.5rem))',
            }}
        >
            <div
                ref={rowRef}
                className="pointer-events-auto relative flex rounded-full border border-[#E5E7EB] bg-white/80 px-1 py-1 shadow-[0_4px_16px_rgba(23,23,23,0.16)] backdrop-blur-[64px] backdrop-saturate-150 dark:border-[#3f3f46] dark:bg-[#1c1c1e]/85 dark:shadow-[0_4px_16px_rgba(0,0,0,0.45)]"
            >
                {pill && (
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute top-0 left-0 rounded-[20px] border border-white/80 bg-[#F5D36B]/25 backdrop-blur-md"
                        style={{
                            transform: `translate(${pill.x}px, ${pill.y}px)`,
                            width: pill.w,
                            height: pill.h,
                            transition: motionOn ? slide : 'none',
                        }}
                    />
                )}
                {tabs.map(({ title, to, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end
                        className="relative z-10 flex min-h-11 w-full flex-col items-center justify-center gap-0.5 text-[#171717]"
                    >
                        <Icon className="h-5 w-5" />
                        <span className="text-2xs">{title}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default BottomNavBar;
