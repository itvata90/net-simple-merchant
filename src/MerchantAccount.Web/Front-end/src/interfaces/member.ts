import { Tracking } from 'src/interfaces/tracking';

export interface IMember extends Tracking {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  merchantId?: string | number;
}

export interface DataResponse {}
