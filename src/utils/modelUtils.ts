import type { Param, Model, ParamValue, Color } from '../types';

export const initializeParamValues = (
  params: Param[], 
  model: Model
): Map<number, string> => {
  const paramValuesMap = new Map<number, string>();
  

  model.paramValues.forEach(pv => {
    paramValuesMap.set(pv.paramId, pv.value);
  });
  
  params.forEach(param => {
    if (!paramValuesMap.has(param.id)) {
      paramValuesMap.set(param.id, '');
    }
  });
  
  return paramValuesMap;
};

export const convertMapToModel = (
  paramValues: Map<number, string>,
  params: Param[],
  originalColors: Color[]
): Model => {
  const paramValuesArray: ParamValue[] = [];
  
  paramValues.forEach((value, paramId) => {
    const paramExists = params.some(param => param.id === paramId);
    if (paramExists && value.trim() !== '') {
      paramValuesArray.push({ paramId, value });
    }
  });
  
  return {
    paramValues: paramValuesArray,
    colors: originalColors
  };
};