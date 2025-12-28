export interface TOrder {
  id: string;
  userFullName: string;
  amount: number;
  status: 'SUCCESS' | 'FAILED';
  packName: string;
}
