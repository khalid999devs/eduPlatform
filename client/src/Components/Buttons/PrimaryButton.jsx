const PrimaryButton = ({
  classes,
  onClick,
  icon,
  text,
  children,
  textClasses,
  props,
  disabled,
  type,
}) => {
  return (
    <button
      className={
        `px-5 py-2.5 text-md text-primary flex flex-row gap-2 uppercase items-center font-medium rounded-md transition-transform hover:scale-105 ${
          disabled && ' opacity-30'
        }` + ` ${classes}`
      }
      onClick={onClick}
      disabled={disabled || false}
      type={type || 'button'}
      {...props}
    >
      {children ? (
        children
      ) : (
        <>
          {text && <p className={`text-sm ${textClasses}`}>{text}</p>}
          {icon && icon}
        </>
      )}
    </button>
  );
};

export default PrimaryButton;
