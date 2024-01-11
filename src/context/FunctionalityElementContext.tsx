import React, { useState } from "react";
import COMPONENT_STATE from "../constants/myAccountComponentStates";
import { FunctionalityElementContextType } from "../models/types/FunctionalityElementContextType";

const defaultSettings: FunctionalityElementContextType = {
    functionalityElement: COMPONENT_STATE.COCKPIT,
    setValue: (value: number) => {}
}

const FunctionalityElementContext = React.createContext<FunctionalityElementContextType>(defaultSettings);

export const ContextProvider = ({ children } : React.PropsWithChildren) => {
    const [functionalityElement, setFunctionalityElement] = useState<number>(COMPONENT_STATE.COCKPIT);
  
    const setValue = (value: number) => {
        setFunctionalityElement(value);
    }

    return (
        <FunctionalityElementContext.Provider value={{ functionalityElement, setValue }}>
            {children}
        </FunctionalityElementContext.Provider>
    );
};

export default FunctionalityElementContext;