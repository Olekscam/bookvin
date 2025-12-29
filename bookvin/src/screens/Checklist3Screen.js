import React from 'react';
import Checklist from '../components/Checklist';

// Mock data for additional car problems
const problemItems = [
  { id: '1', label: 'Suspension feels stiff or bouncy' },
  { id: '2', label: 'Car pulls to one side' },
  { id: '3', label: 'A/C or heater is not working' },
  { id: '4', label: 'Battery drains quickly' },
  { id: '5', label: 'Warning lights on dashboard' },
];

const Checklist3Screen = ({ navigation }) => {
  const handleComplete = () => {
    // TODO: Save the selected items
    navigation.navigate('Checklist4');
  };

  return (
    <Checklist
      title="Diagnostics Checklist: Other Issues"
      items={problemItems}
      onComplete={handleComplete}
    />
  );
};

export default Checklist3Screen;
