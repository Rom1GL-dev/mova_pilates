import FormImageDrop from '@/components/form-image-drop.tsx';
import { env } from '@/env.ts';

type Props = {
  image?: File | string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  category: string;
  name: string;
};
export function FormImageField({
  image,
  onImageChange,
  category,
  required,
  name
}: Props) {
  const inputId = `dropzone-file-${name}`;

  const handleImageClick = () => {
    const input = document.getElementById(inputId) as HTMLInputElement;
    input?.click();
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Image
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div
        className="flex h-60 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400 hover:bg-gray-100"
        onClick={handleImageClick}
      >
        {image ? (
          <img
            src={
              typeof image === 'string'
                ? `${env.API_URL}/v1/images/${category}/${image}`
                : URL.createObjectURL(image)
            }
            alt="Preview"
            className="h-full w-full rounded-md object-cover shadow"
          />
        ) : (
          <FormImageDrop />
        )}
      </div>

      <input
        id={inputId}
        type="file"
        className="hidden"
        onChange={onImageChange}
      />
    </div>
  );
}
