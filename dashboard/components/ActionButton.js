export default function ActionButton({
  disabled,
  onClick,
  children
}) {

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`action-button ${
        disabled ? 'disabled' : ''
      }`}
    >

      {children}

    </button>
  );
}