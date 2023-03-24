interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Button = ({ children, disabled, onClick, className }: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={'bg-gray-100 hover:bg-gray-200 px-3 py-2 mb-3 ' + className}
    >
      {children}
    </button>
  );
};
