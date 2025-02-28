export default function Logo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform cursor-pointer"
    >
      <rect x="4" y="4" width="40" height="40" rx="8" className="fill-current opacity-10" />
      <path
        d="M16 18L20 30M24 14L28 26M32 18L28 30"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 34H34"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
} 