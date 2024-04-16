import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const RichTextEditor = ({ value, onChange }) => {
  return (
    <ReactQuill
      theme="snow" 
      value={value}
      onChange={onChange}
      modules={{
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], 
          ['clean']
        ]
      }}
    />
  );
};

export default RichTextEditor;
