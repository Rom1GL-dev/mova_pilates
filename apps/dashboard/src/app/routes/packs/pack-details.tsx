import { PackDetail } from '@/features/pack/pack-detail.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes.config.tsx';

export default function PackDetailsRoot() {
  const param = useParams();
  const navigate = useNavigate();

  if (!param.id) {
    navigate(APP_ROUTES.packs.getHref());
    return null;
  }

  return <PackDetail packId={param.id} />;
}
