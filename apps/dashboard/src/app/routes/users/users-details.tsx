import { useNavigate, useParams } from 'react-router-dom';
import { UserDetail } from '@/features/user/user-detail.tsx';
import { APP_ROUTES } from '@/config/routes.config.tsx';

export default function UserDetailsRoot() {
  const param = useParams();
  const navigate = useNavigate();

  if (!param.id) {
    navigate(APP_ROUTES.users.getHref());
    return null;
  }

  return <UserDetail userId={param.id} />;
}
