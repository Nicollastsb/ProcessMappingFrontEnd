export const CustomButton = ({
  descriptionButton,
  handleClick,
  classButton,
  disabledButton = false,
}) => {
  return (
    <button
      className={classButton}
      onClick={handleClick}
      disabled={disabledButton}
    >
      {descriptionButton}
    </button>
  );
};
