import React from 'react';
import { connect } from 'react-redux';
import { toggleNightMode } from '../redux/actions';

const Sidebar = ({ nightMode, toggleNightMode }) => {
  
  const handleNightModeToggle = () => {
    toggleNightMode();
  };

  return (
    <div className={`Sidebar ${nightMode ? 'NightMode' : ''}`}>
      <label className="NightModeLabel">
        {nightMode ? 'Day Mode:' : 'Night Mode:'}
      </label>
      <div className="NightModeToggleWrapper" onClick={handleNightModeToggle}>
        <div
          className={`NightModeToggleSlider ${
            nightMode ? 'NightModeToggleOn' : ''
          }`}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  nightMode: state.nightMode,
});

const mapDispatchToProps = {
  toggleNightMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
