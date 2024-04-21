import * as Label from "@radix-ui/react-label";
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Separator from '@radix-ui/react-separator';
import { ExclamationMark } from "@phosphor-icons/react";
import {useState} from 'react';
import { Eye, EyeSlash } from "@phosphor-icons/react";


export function Input({inputType, inputStyle, labelContent, labelStyle, placeholder, onChangeFunction, onBlurFunction, value, id, nome, icon, invalidMessage, valid}) {
  
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (

    <div className="relative group">
      <Label.Root
        className={`${labelStyle ? labelStyle : ' group-focus-within:text-primary-green300 text-lg font-bold pl-[8%]'} ${valid ? 'text-errorRed' : ''}`}
        htmlFor={id}
      >
        {labelContent}
      </Label.Root>

      <div  className={ inputStyle || ` ${valid ? '  !ring-errorRed ' : ''}  group-focus-within:!ring-primary-green300 h-16 p-3  relative flex w-full  bg-gray100 border-gray100 border-2 rounded-full outline-none ring-1 ring-gray500`}>
      
        <div className="flex items-center">
              {icon}
              <Separator.Root
                className={` ${valid ? '!bg-errorRed': ''} group-focus-within:!bg-primary-green300 bg-gray500 data-[orientation=vertical]:w-[1.1px] h-full rounded-full mx-[10px]`}
                decorative
                orientation="vertical"
              />
        </div>

        <input
          className={` ${valid ? '  !text-errorRed ' : ''} appearance-none  font-mavenPro text-xl outline-none  w-full rounded-e-full text-gray500`}
            
          placeholder={placeholder}
          onChange={onChangeFunction}
          onBlur={onBlurFunction}
          value={value}
          id={id}
          name={nome}
          type={inputType === "password" ? (passwordVisibility ? "text" : "password") : inputType}
        />

        {inputType === "password" ? 
      
          passwordVisibility ? 
          <button type="button" onClick={() => setPasswordVisibility(!passwordVisibility)}><Eye color="#000000" size={32}/></button> 
          : <button type="button" onClick={() => setPasswordVisibility(!passwordVisibility)}><EyeSlash color="#000000" size={32}/></button> 

        : ''}

        {valid ?           
        <Tooltip.Provider delayDuration = {100}>
              <Tooltip.Root>
                <Tooltip.Trigger side="top" >
                  <div className="bg-errorRed rounded-full">
                    <ExclamationMark  size={25}/>
                  </div>
                </Tooltip.Trigger>

              {invalidMessage ?
                <Tooltip.Portal>
                  <Tooltip.Content side={"top"} className={`data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-gray100 px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]`}
                  sideOffset={5}>
                    {invalidMessage && <div>{invalidMessage()}</div>}
                    <Tooltip.Arrow className="fill-gray100" />
                  </Tooltip.Content>
                </Tooltip.Portal> : ''
              }

              </Tooltip.Root>
            </Tooltip.Provider> : ''}
      </div>
    </div>

  );
}
