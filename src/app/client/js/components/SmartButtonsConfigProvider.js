import React, { useCallback, useContext, useMemo, useState } from 'react';

const SmartButtonsConfig = React.createContext({});

export const SmartButtonsConfigProvider = ({
  smartButtonsConfig,
  children,
}) => {
  return (
    <SmartButtonsConfig.Provider value={smartButtonsConfig}>
      {children}
    </SmartButtonsConfig.Provider>
  );
};

export const useSmartButtonsConfig = () => {
  const value = useContext(SmartButtonsConfig);

  return value;
};

export default SmartButtonsConfigProvider;
