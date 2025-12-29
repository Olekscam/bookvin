import React from 'react';
import Checklist from '../components/Checklist';

// Mock data for maintenance work
const maintenanceItems = [
  { id: '1', label: 'Oil Change' },
  { id: '2', label: 'Air Filter Replacement' },
  { id: '3', label: 'Tire Rotation' },
  { id: '4', label: 'Brake Inspection' },
  { id: '5', label: 'Spark Plug Replacement' },
];

const Checklist1Screen = ({ navigation }) => {
  const handleComplete = () => {
    // TODO: Save the selected items
    navigation.navigate('Checklist2');
  };

  return (
    <Checklist
      title="Maintenance Checklist: Known Work"
      items={maintenanceItems}
      onComplete={handleComplete}
    />
  );
};

export default Checklist1Screen;
