import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function LegalEditor({ value, onChange }: Props) {
  return (
    <div className="rounded-xl border bg-white">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        className="min-h-[400px]"
      />
    </div>
  );
}
