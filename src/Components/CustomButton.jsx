export const CustomButton = ({
  descriptionButton,
  handleClick,
  classButton,
  disabledButton = false,
  type = 'button',
}) => {
  return (
    <button
      className={classButton}
      onClick={handleClick}
      disabled={disabledButton}
      type={type}
    >
      {descriptionButton}
    </button>
  );
};
