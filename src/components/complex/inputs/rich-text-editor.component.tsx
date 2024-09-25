import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CommonComponentProps } from '../../../lib/props';
import { IdeaCardData } from '../../../types/IdeaCardData';

interface RichTextEditorProps extends CommonComponentProps {
  textContent: string;
  onUpdate?: (updatedData: Partial<IdeaCardData>) => void;
  setTextCount: (count: number) => void;
}

const RichTextEditor = ({ textContent, onUpdate, setTextCount }: RichTextEditorProps) => {

  const handleChange = (content, delta, source, editor) => {
    onUpdate && onUpdate({ text: editor.getHTML() });
    // setTextContent(editor.getHTML());
    setTextCount(editor.getLength() - 1);
    // Use editor.getText() for plain text or getContents() for delta object
  };


  return (
    <div className='w-full px-2'>
      <ReactQuill
        value={textContent}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        theme="snow"
      />
    </div>
  );
};

// Define editor modules (optional)
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'] // remove formatting
  ]
};

// Define editor formats (optional)
const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'link',
  'image'
];

export default RichTextEditor;