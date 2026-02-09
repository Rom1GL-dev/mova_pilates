import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function LegalEditor({ value, onChange }: Props) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link'],
      ['clean'],
    ],
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        className="legal-editor"
        placeholder="Saisissez le contenu légal..."
      />
      <style>{`
        .legal-editor .ql-container {
          min-height: 500px;
          font-size: 15px;
          line-height: 1.6;
        }
        .legal-editor .ql-editor {
          min-height: 500px;
          padding: 20px 24px;
        }
        .legal-editor .ql-toolbar {
          border-bottom: 1px solid #e5e7eb;
          background: #fafafa;
          padding: 12px;
        }
        .legal-editor .ql-container {
          border: none;
        }
        .legal-editor .ql-toolbar {
          border-top: none;
          border-left: none;
          border-right: none;
        }
      `}</style>
    </div>
  );
}
