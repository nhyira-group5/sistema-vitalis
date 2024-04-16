const Button = ({ onClick, style, content, type }) => {
    return (
      
        <button onClick={onClick} type={type} className={style}>
          {content}
        </button>

    );
  };
  
  export default Button;