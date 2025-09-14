import { useNavigate, useParams } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes.config.tsx';
import { TypeCourseDetail } from '@/features/type-course/type-course-detail.tsx';

export default function TypeCourseDetailsRoot() {
  const param = useParams();
  const navigate = useNavigate();

  if (!param.id) {
    navigate(APP_ROUTES.typesCourse.getHref());
    return null;
  }

  return <TypeCourseDetail typeCourseId={param.id} />;
}
