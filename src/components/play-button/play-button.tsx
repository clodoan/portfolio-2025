interface PlayButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export default function PlayButton({
  onClick,
  className = "",
}: PlayButtonProps) {
  return (
    <button
      type="button"
      className={`bg-[#fff] bg-opacity-40 backdrop-blur-sm rounded-full p-4 pointer-events-auto cursor-pointer hover:bg-opacity-70 transition-all duration-200 hover:shadow-sm hover:text-secondary text-primary ${className}`}
      onClick={onClick}
    >
      <svg
        className="w-10 h-10"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
