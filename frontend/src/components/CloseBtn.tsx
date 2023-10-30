import "./closeBtn.css";
interface Props {
  handleClick: () => void;
}

const CloseBtn = ({ handleClick }: Props) => {
  return (
    <button onClick={handleClick} className="abstract-close-btn">
      ❌
    </button>
  );
};

export default CloseBtn;
