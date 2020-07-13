export interface IStepsState {
  currentStep: 'info' | 'confirm' | 'result';
  finishStatus: 'success' | 'error';
  formData: {
    name: string;
    projectName: string;
  };
}

export type Action =
  | { type: 'setCurrentStep'; currentStep: IStepsState['currentStep'] }
  | { type: 'clickNextStep'; payload: Pick<IStepsState, 'currentStep' | 'formData'> }
  | { type: 'submitData'; payload: Pick<IStepsState, 'currentStep' | 'finishStatus'> };

export const initialState: IStepsState = {
  currentStep: 'info',
  finishStatus: 'success',
  formData: {
    name: '',
    projectName: '',
  },
};

export const stepsReducer = (state: IStepsState, action: Action) => {
  switch (action.type) {
    case 'setCurrentStep':
      return { ...state, currentStep: action.currentStep };
    case 'clickNextStep':
      return { ...state, ...action.payload };
    case 'submitData':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
