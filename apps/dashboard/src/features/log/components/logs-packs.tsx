import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card.tsx';
import { useGetPacksByTypeCourse } from '@/features/type-course/usecases/get-packs-by-type-course/use-get-packs-by-type-course.tsx';
import { TTypeCourse } from '@/features/type-course/types/TTypeCourse.ts';
import { TPack } from '@/features/pack/types/TPack.ts';
import { Button } from '@mui/material';

interface Props {
  typeCourse: TTypeCourse;
}

export function LogsPacks({ typeCourse }: Props) {
  const { data: packResponse, isLoading } = useGetPacksByTypeCourse(
    typeCourse.id
  );
  const packData = packResponse?.data.packs;

  if (isLoading || !packData) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="border-primary h-10 w-10 animate-spin rounded-full border-4 border-solid border-t-transparent" />
      </div>
    );
  }

  if (packData.length === 0) {
    return (
      <div className="text-muted-foreground text-center">
        Aucun pack pour ce type de cours.
      </div>
    );
  }

  return (
    <>
      <div className={'mb-5'}>
        Vous trouverez ci-dessous la liste des packs disponibles pour le type de
        cours &quot;{typeCourse.label}&quot;.
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {packData.map((pack: TPack) => (
          <Card key={pack.id} className="hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {pack.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <span className=" mr-1 font-medium">{pack.nbCourse}</span>
                séances
              </p>
              <p>
                <span className=" font-medium">{pack.price}€</span>
              </p>
              <div className={'flex justify-end'}>
                <Button
                  href={'/packs/' + pack.id}
                  className="mt-6 cursor-pointer !bg-[#b28053] !text-white hover:!bg-[#8b6f55]"
                >
                  Voir le pack
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
