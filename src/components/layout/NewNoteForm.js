import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function NewNoteForm(props) {
  const node = useRef();

  useEffect(() => {
    const counter = document.querySelectorAll('textarea#title-note,textarea#content');
    // eslint-disable-next-line no-undef
    M.CharacterCounter.init(counter);
  }, []);

  useEffect(() => {
    document.addEventListener('click', closePanel);
    return () => {
      document.removeEventListener('click', closePanel);
    };
  }, []);

  function closePanel(e) {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    props.newNoteOff();
  }

  return (
    <form className="new-note-form" onSubmit={props.handleSubmit} ref={node}>
      <div className="row input-field title-input">
        <textarea
          id="title-note"
          className="materialize-textarea"
          name="title"
          onChange={props.handleChange}
          required
          data-length="50"
          maxLength="50"
          defaultValue=""
        />
        <label htmlFor="title">Title</label>
      </div>
      <div className="row input-field content-input">
        <textarea
          id="content"
          className="materialize-textarea"
          name="content"
          onChange={props.handleChange}
          required
          data-length="2500"
          maxLength="2500"
          defaultValue=""
        />
        <label htmlFor="textarea">Content</label>
      </div>
      <div className="save-input-button">
        <button type="submit" className="btn pink waves-effect waves-light save-input">
          Save
        </button>
      </div>
    </form>
  );
}
NewNoteForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  newNoteOff: PropTypes.func.isRequired
};
