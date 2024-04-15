const Button = ({ onClick, style, content }) => {
    return (
      
        <button onClick={onClick} className={style}>
          {content}
        </button>
    );
  };
  
  export default Button;