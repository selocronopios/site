// react-input-mask.d.ts
declare module 'react-input-mask' {
  import { ComponentType, InputHTMLAttributes } from 'react';

  interface Props extends InputHTMLAttributes<HTMLInputElement> {
    mask: string;
    maskChar?: string | null;
    alwaysShowMask?: boolean;
    beforeMaskedValueChange?: (
      newState: { value: string; selection: { start: number; end: number } },
      oldState: { value: string; selection: { start: number; end: number } },
      userInput: string
    ) => { value: string; selection: { start: number; end: number } };
  }

  const InputMask: ComponentType<Props>;
  export default InputMask;
}
