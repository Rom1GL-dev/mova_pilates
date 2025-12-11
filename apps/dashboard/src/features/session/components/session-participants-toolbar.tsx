'use client';

import { DataTableSearch } from '@/components/data-table/data-table-search';
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options';
import { Button } from '@/components/ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';
import { DataTableFilter } from '@/components/data-table/data-table-filter.tsx';
import { SESSION_PARTICIPANT_RESERVATION_STATUS_DATA } from '@/features/session/utils/type-course-data.tsx';
import { SessionParticipantAddParticipant } from '@/features/session/components/session-participant-add-participant.tsx';
import { useParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import * as React from 'react';

interface Props {
  table: any;
  data?: any;
}

export function SessionParticipantListingToolbar({ table, data }: Props) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { id } = useParams();
  const isMobile = useIsMobile();
  const [openFilters, setOpenFilters] = React.useState(false);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
          <DataTableSearch table={table} />
          {!isMobile && (
            <div className="flex items-center gap-x-3">
              <DataTableFilter
                title="Status"
                column="reservationStatus"
                table={table}
                options={Object.values(
                  SESSION_PARTICIPANT_RESERVATION_STATUS_DATA
                ).map((status) => ({
                  label: status.label,
                  value: status.value
                }))}
              />

              {isFiltered && (
                <Button
                  variant="ghost"
                  onClick={() => table.resetColumnFilters()}
                  className="h-8 px-2 lg:px-3"
                >
                  Annuler
                  <Cross2Icon className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        {isMobile && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setOpenFilters((prev) => !prev)}
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                openFilters ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </Button>
        )}

        {!isMobile && (
          <div className="flex flex-1 justify-end">
            <SessionParticipantAddParticipant
              sessionId={id ?? ''}
              disabled={data?.[0] && data.length >= data[0].capacity}
            />
          </div>
        )}
      </div>

      {isMobile && openFilters && (
        <div className="flex w-full flex-col gap-4 rounded-md bg-[#f3e8de] p-4 shadow-sm">
          <DataTableFilter
            title="Status"
            column="reservationStatus"
            table={table}
            options={Object.values(
              SESSION_PARTICIPANT_RESERVATION_STATUS_DATA
            ).map((status) => ({
              label: status.label,
              value: status.value
            }))}
          />

          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2"
            >
              Réinitialiser les filtres
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}

          <SessionParticipantAddParticipant
            sessionId={id ?? ''}
            disabled={data?.[0] && data.length >= data[0].capacity}
          />
        </div>
      )}
    </div>
  );
}
