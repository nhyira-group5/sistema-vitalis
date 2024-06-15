import React from "react";
import * as Label from "@radix-ui/react-label";

    export function Checkbox({labelcontent, Id, name, disabled = false, labelStyle, onChangeFunction, checked }) {
      return (
            <div className="inline-flex items-center">
              <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor={Id}>
                
                <input type="checkbox"
                  className={`${disabled ? 'cursor-default' : 'cursor-pointer'} before:content[''] peer relative h-7 w-7 border-primary-green300 appearance-none rounded-lg border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary-green300 checked:bg-primary-green300 checked:before:bg-primary-green300 hover:before:opacity-10`}
                  id={Id} 
                  name={name}
                  onChange={(e)=> onChangeFunction(e)}
                  disabled={disabled}
                  checked={checked ?? null}/>
                  

                <span
                  className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                    stroke="currentColor" stroke-width="1">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
                  </svg>
                </span>
              </label>
              
              <label htmlFor={Id} className={labelStyle || `font-normal text-lg text-white cursor-pointer `} >
                {labelcontent}
              </label>
            </div> 
        );
    }
  
  