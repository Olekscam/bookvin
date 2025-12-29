import React from 'react';
import Checklist from '../components/Checklist';

// Mock data for common car problems
const problemItems = [
  { id: '1', label: 'Engine makes strange noises' },
  { id: '2', label: 'Brakes are squeaking' },
  { id: '3', label: 'Check Engine light is on' },
  { id: '4', label: 'Poor fuel economy' },
  { id: '5', label: 'Transmission is slipping' },
];

const Checklist2Screen = ({ navigation }) => {
  const handleComplete = () => {
    // TODO: Save the selected items
    navigation.navigate('Checklist3');
  };

  return (
    <Checklist
      title="Diagnostics Checklist: Problems"
      items={problemItems}
      onComplete={handleComplete}
    />
  );
};

export default Checklist2Screen;
