import { Tracking } from './tracking';

export interface IMerchant extends Tracking {
  id?: string;
  name?: string;
  province?: string;
  district?: string;
  email?: string;
  phone?: string;
  ownerId?: number;
  status?: string;
}
