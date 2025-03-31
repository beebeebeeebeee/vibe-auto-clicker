export const ClickIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M20 10v20M10 20h20" stroke="currentColor" strokeWidth="2"/>
    </svg>
);

export const AutoIcon = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 5v5M20 30v5M5 20h5M30 20h5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="2">
            <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 20 20"
                to="360 20 20"
                dur="4s"
                repeatCount="indefinite"
            />
        </circle>
    </svg>
); 