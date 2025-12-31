import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LegalEditor } from '@/features/legal/components/legal-editor';
import { useLegal } from '@/features/legal/usecases/use-legal.tsx';
import { useUpdateLegal } from '@/features/legal/usecases/use-update-legal.tsx';
import { toast } from 'react-toastify';

type Props = {
  type: string;
  title: string;
};

export function LegalTabContent({ type, title }: Props) {
  const { data, isLoading } = useLegal(type);
  const updateLegal = useUpdateLegal();

  const [content, setContent] = useState('');

  useEffect(() => {
    if (data) setContent(data.content);
  }, [data]);

  const handleSubmit = () => {
    updateLegal.mutate({
      type,
      content
    });

    toast.success('Texte légal mis à jour avec succès');
  };
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>

      {isLoading ? (
        <p className="text-muted-foreground text-sm">Chargement…</p>
      ) : (
        <>
          <LegalEditor value={content} onChange={setContent} />

          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={updateLegal.isPending}>
              {updateLegal.isPending ? 'Enregistrement…' : 'Enregistrer'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
