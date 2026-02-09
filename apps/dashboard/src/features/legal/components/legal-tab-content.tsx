import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LegalEditor } from '@/features/legal/components/legal-editor';
import { useLegal } from '@/features/legal/usecases/use-legal.tsx';
import { useUpdateLegal } from '@/features/legal/usecases/use-update-legal.tsx';
import { toast } from 'react-toastify';
import { Loading } from '@/components/loading';

type Props = {
  type: string;
  title: string;
};

export function LegalTabContent({ type, title }: Props) {
  const { data, isLoading, isFetching } = useLegal(type);
  const updateLegal = useUpdateLegal();

  const [content, setContent] = useState('');

  // Réinitialise le contenu quand le type change
  useEffect(() => {
    setContent('');
  }, [type]);

  // Met à jour le contenu quand les données arrivent
  useEffect(() => {
    if (data?.content !== undefined) {
      setContent(data.content);
    }
  }, [data?.content]);

  const handleSubmit = () => {
    updateLegal.mutate({
      type,
      content
    });

    toast.success('Texte légal mis à jour avec succès');
  };

  // Affiche le loading si en cours de chargement OU si pas de données
  const showLoading = isLoading || isFetching || !data;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>

      {showLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loading />
        </div>
      ) : (
        <>
          <LegalEditor
            key={`${type}-${data?.content?.substring(0, 50)}`}
            value={content}
            onChange={setContent}
          />

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
