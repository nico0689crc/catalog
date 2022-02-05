import "./Error.css";

const Error = props => {
  return (
    <div className="error__container">
      <p className="error__message">{props.message}</p>
    </div>
  );
};

export default Error;
