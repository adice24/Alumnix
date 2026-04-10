export function SunburstLogo({
  className = "h-8 w-8",
  "aria-hidden": ariaHidden = true,
}: {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
    >
      <circle cx="20" cy="20" r="5" className="fill-brand-orange" />
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i * 360) / 14;
        return (
          <line
            key={i}
            x1="20"
            y1="20"
            x2="20"
            y2="6"
            className="stroke-brand-orange"
            strokeWidth="2.2"
            strokeLinecap="round"
            transform={`rotate(${angle} 20 20)`}
          />
        );
      })}
    </svg>
  );
}
