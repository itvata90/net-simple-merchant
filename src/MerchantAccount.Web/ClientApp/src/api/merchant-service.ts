import client, { Service } from 'src/lib/http-client-setup';
import { IMerchant } from 'src/interfaces/merchant';

const merchantAPI = '/merchants/';

class MerchantService implements Service<IMerchant> {
  get = (queryString: string = '', config?: any) => client.get<IMerchant[]>(merchantAPI + queryString, config);
  getSingle = (id: string | number, config?: any) => client.get<IMerchant>(merchantAPI + id, config);
  add = (body: IMerchant, config?: any) => client.post<IMerchant>(merchantAPI, body, config);
  update = (id: string | number, body: IMerchant, config?: any) =>
    client.put<IMerchant>(merchantAPI + id, body, config);
  remove = (id: string | number, config?: any) => client.delete<IMerchant>(merchantAPI + id, config);
  getMembers = (id: string | number, queryString: string = '', config?: any) =>
    client.get(merchantAPI + id + '/members' + queryString, config);
}

export default new MerchantService();
