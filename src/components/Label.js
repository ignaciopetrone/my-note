import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateLabel } from '../redux/actions/noteActions';
import PropTypes from 'prop-types';

function Label({ id, changeLabel }) {
  useEffect(() => {
    //Colors
    const elems = document.querySelectorAll('.fixed-action-btn');
    // eslint-disable-next-line no-undef
    M.FloatingActionButton.init(elems, {
      direction: 'top',
      hoverEnabled: true
    });
  }, []);

  const labels = [
    { label: 'Personal', icon: 'person_outline' },
    { label: 'Work', icon: 'work' },
    { label: 'Inspiration', icon: 'brush' },
    { label: 'None', icon: 'not_interested' }
  ];

  function getLabels() {
    return labels.map(item => {
      return (
        <li key={item.label}>
          <a className="btn-floating" onClick={() => changeLabel(id, item.label)}>
            <i className="material-icons">{item.icon}</i>
          </a>
          <p className="label-p">{item.label}</p>
        </li>
      );
    });
  }

  return (
    <div className="fixed-action-btn" style={{ display: 'flex' }}>
      <i className="material-icons tool-icon flex-end">label_outline</i>
      <ul className="labels-container">{getLabels()}</ul>
    </div>
  );
}

Label.propTypes = {
  id: PropTypes.string,
  changeLabel: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    changeLabel: (id, label) => dispatch(updateLabel(id, label))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Label);
