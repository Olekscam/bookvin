import React from 'react';
import Checklist from '../components/Checklist';

// Mock data for mandatory work based on mileage
const mandatoryItems = [
  { id: '1', label: 'Timing Belt Replacement' },
  { id: '2', label: 'Transmission Fluid Change' },
  { id: '3', label: 'Coolant Flush' },
  { id: '4', label: 'Brake Fluid Replacement' },
];

const Checklist4Screen = ({ navigation }) => {
  const handleComplete = () => {
    // This is the final step, navigate to the main Service Center
    navigation.navigate('Main', { screen: 'Service' });
  };

  return (
    <Checklist
      title="Maintenance Checklist: Mandatory Work"
      items={mandatoryItems}
      onComplete={handleComplete}
    />
  );
};

export default Checklist4Screen;
