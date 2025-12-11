import { api } from '@/lib/api.ts';
import { UpdateSessionForm } from '@/features/session/usecases/update-session/update-session.dto.ts';
import { DeleteSessionDto } from '@/features/session/usecases/delete-session/delete-session.dto.ts';
import { CreateSessionForm } from '@/features/session/usecases/create-session/create-session.dto.ts';
import { UpdateReservationDto } from '@/features/session/usecases/update-reservation/update-reservation.dto.ts';
import { AddParticipantDto } from '@/features/session/usecases/add-participant/add-participant.dto.ts';

export class SessionService {
  readonly _uri: string = '/v1/backoffice/sessions';
  readonly _ReservationUri: string = '/v1/backoffice/reservations';

  constructor() {}

  async listPacks() {
    return await api.get(this._uri);
  }

  async getPack(id: string) {
    return await api.get(this._uri + '/' + id);
  }

  async update(data: UpdateSessionForm) {
    return api.put<UpdateSessionForm>(this._uri, data);
  }

  async deletePack(data: DeleteSessionDto) {
    return api.delete(this._uri, { data });
  }

  async create(data: CreateSessionForm) {
    return api.post<CreateSessionForm>(this._uri, data);
  }

  async listReservationBySession(sessionId: string) {
    return await api.get(this._ReservationUri + `/session/${sessionId}`);
  }

  async updateReservation(data: UpdateReservationDto) {
    return api.put<UpdateReservationDto>(this._ReservationUri, data);
  }

  async addParticipant(data: AddParticipantDto) {
    return api.post<AddParticipantDto>(
      this._ReservationUri + '/session/reservation',
      data
    );
  }

  async deleteParticipant(data: DeleteSessionDto) {
    return api.delete(this._ReservationUri, { data });
  }
}

export const sessionService = new SessionService();
