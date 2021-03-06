import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// import moment from 'moment/min/locales';
import Colors from '../Colors';
import Label from '../Label';

export default function EditNoteForm(props) {
  const { title, content, lastUpdate, id, color, label } = props.note;
  const node = useRef();
  let background = color;

  useEffect(() => {
    const counter = document.querySelectorAll('textarea#title-note,textarea#content');
    // eslint-disable-next-line no-undef
    M.CharacterCounter.init(counter);
  }, []);

  useEffect(() => {
    document.addEventListener('click', clickLocation);
    return () => {
      document.removeEventListener('click', clickLocation);
    };
  }, []);

  async function clickLocation(e) {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    // props.formOff();
  }

  function getHeight() {
    let intro = 0;
    for (let i = 0; i < content.length; i++) {
      if (content[i] === '\n' || content[i] === '\r') {
        intro++;
      }
    }
    const base = 45;
    return base + Math.floor(content.length / 70 + intro * 0.6) * 17;
  }

  function handleClose(e) {
    e.preventDefault();
    props.formOff();
  }

  return (
    <form
      className="new-note-form"
      style={{ backgroundColor: background }}
      onSubmit={props.handleSubmit}
      ref={node}
    >
      <div>
        <div className="row input-field title-input">
          <textarea
            id="title-note"
            className="materialize-textarea"
            name="title"
            onChange={e => props.handleChange(e)}
            required
            data-length="50"
            maxLength="50"
            key={title}
            defaultValue={title}
          />
        </div>
        <div className="row input-field content-input">
          <textarea
            id="content"
            className="materialize-textarea content-textarea"
            name="content"
            onChange={e => props.handleChange(e)}
            required
            data-length="2500"
            maxLength="2500"
            key={content}
            defaultValue={content}
            style={{ height: `${getHeight()}px`, paddingTop: '0px' }}
          />
        </div>
      </div>
      <div>
        <p className="last-update grey-text flex-end">
          Last update: {moment(lastUpdate.toDate()).calendar()}
        </p>
        <div className="tools-save-container">
          <div className="tools">
            <Colors id={id} />
            <Label id={id} selected={label} />
            <div className="tooltip">
              <i className="material-icons tool-icon" onClick={() => props.handleDelete(id)}>
                delete
              </i>
              <span className="tooltiptext">Delete note</span>
            </div>
          </div>
          <div className="form-buttons">
            <button type="submit" className="save-input">
              Save
            </button>
            <button className="save-input" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
EditNoteForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  formOff: PropTypes.func.isRequired
};
