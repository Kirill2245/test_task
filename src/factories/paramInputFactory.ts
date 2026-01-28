import { StringParamInput } from '../components/Inputs';
import type { ParamInputProps } from '../types';


export const ParamInputFactory: Record<string, React.FC<ParamInputProps>> = {
  string: StringParamInput,
};

export const getParamInputComponent = (type: string) => {
  const Component = ParamInputFactory[type];
  if (!Component) {
    throw new Error(`No component found for param type: ${type}`);
  }
  return Component;
};