import { X, Plus, Check } from "@phosphor-icons/react";
  
  const Button = ({ onClick, buttonStyle, content, type, disabled, variant, icon, iconVisibility = true }) => {

  const variant1 = {buttonStyle: "text-gray100 bg-primary-green300 rounded-full font-bold px-5 py-4 hover:bg-primary-green400 transition-all flex items-center gap-1",
                    icon: <Plus/>};
                    
  const variant2 = {buttonStyle: "text-gray100 bg-errorRed rounded-full font-bold px-5 py-4 hover:bg-errorRed/75 transition-all flex items-center gap-1",
                    icon: <X/>};
                    
  const variant3 = {buttonStyle: "text-gray100 bg-successBlue rounded-full font-bold px-5 py-4 hover:bg-successBlue/50 transition-all flex items-center gap-1",
                    icon: <Check/>};

  const selectedVariant = variant === "create" ? variant1 : variant === "decline" ? variant2 : variant === "accept" ? variant3 : variant1;

    return (
      <button onClick={onClick} type={type} className={buttonStyle || selectedVariant.buttonStyle } disabled={disabled}>      
          {iconVisibility && (icon || selectedVariant.icon)}
          {content}
      </button>

    );
  };
  
  export default Button;
