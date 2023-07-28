import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Select, Button } from 'antd';
import { loadRegion } from '../redux/actions';

const { Option } = Select;

const FormInput = () => {
  const [selectedRegion, setSelectedRegion] = useState('Select Country');
  const dispatch = useDispatch();

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
  };

  const handleLoadClick = () => {
    console.log('Selected Region:', selectedRegion);
    dispatch(loadRegion(selectedRegion));
  };

  return (
    <div>
      <Select value={selectedRegion} onChange={handleRegionChange}>
        <Option value="Select Country" disabled>
          Select Country
        </Option>
        <Option value="India">India</Option>
        <Option value="United States">United States</Option>
        <Option value="United Kingdom">United Kingdom</Option>
      </Select>
      <Button onClick={handleLoadClick}>Load</Button>
    </div>
  );
};

export default FormInput;
