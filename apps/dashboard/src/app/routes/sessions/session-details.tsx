import { useNavigate, useParams } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes.config.tsx';
import { SessionDetail } from '@/features/session/session-detail.tsx';

export default function SessionDetailsRoot() {
  const param = useParams();
  const navigate = useNavigate();

  if (!param.id) {
    navigate(APP_ROUTES.sessions.getHref());
    return null;
  }

  return <SessionDetail sessionId={param.id} />;
}
