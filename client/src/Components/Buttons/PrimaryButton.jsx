const PrimaryButton = ({
  classes,
  onClick,
  icon,
  text,
  children,
  textClasses,
}) => {
  return (
    <button
      className={
        'px-5 py-2 text-md text-primary flex flex-row gap-2 uppercase items-center border' +
        ` ${classes}`
      }
      onClick={onClick}
    >
      {children ? (
        children
      ) : (
        <>
          <p className={`text-sm ${textClasses}`}>{text}</p>
          {icon && icon}
        </>
      )}
    </button>
  );
};

export default PrimaryButton;
