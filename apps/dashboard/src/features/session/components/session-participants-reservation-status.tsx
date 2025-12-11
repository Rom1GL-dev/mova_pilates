import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { SessionParticipantReservationStatus } from '@/features/session/types/TSessionParticipants';
import { SESSION_PARTICIPANT_RESERVATION_STATUS_DATA } from '@/features/session/utils/type-course-data';
import { useUpdateReservation } from '@/features/session/usecases/update-reservation/use-update-reservation';

interface Props {
  reservationId: string;
  reservationStatus: SessionParticipantReservationStatus;
}

export function SessionParticipantsReservationStatus({
  reservationId,
  reservationStatus
}: Props) {
  const updateReservation = useUpdateReservation();

  const handleChange = (value: string) => {
    updateReservation.mutate({
      id: reservationId,
      status: value as SessionParticipantReservationStatus
    });
  };

  const current =
    SESSION_PARTICIPANT_RESERVATION_STATUS_DATA[reservationStatus];

  return (
    <div className="flex items-center">
      <Select
        defaultValue={reservationStatus}
        onValueChange={handleChange}
        disabled={updateReservation.isPending}
      >
        <SelectTrigger className="flex w-[170px] items-center gap-2">
          {updateReservation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
          ) : null}

          <div
            className={`rounded-md px-2 py-1 text-xs font-medium ${current.className}`}
          >
            {current.label}
          </div>
        </SelectTrigger>

        <SelectContent>
          {Object.entries(SESSION_PARTICIPANT_RESERVATION_STATUS_DATA).map(
            ([value, { label, className }]) => (
              <SelectItem value={value} key={value}>
                <div
                  className={`rounded-md px-2 py-1 text-xs font-medium ${className}`}
                >
                  {label}
                </div>
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
