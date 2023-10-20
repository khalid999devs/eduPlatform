const IconText = ({ icon, text, classes, children, textClasses }) => {
  return (
    <div
      className={
        'text-md text-primary flex flex-row gap-2 items-center' + ` ${classes}`
      }
    >
      {children ? (
        children
      ) : (
        <>
          {icon && icon}
          <p className={`text-sm ${textClasses}`}>{text}</p>
        </>
      )}
    </div>
  );
};

export default IconText;
