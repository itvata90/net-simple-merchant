import client, { ResponseListDataType, Service } from 'src/api/http-client-setup';
import { IMember } from 'src/interfaces/member';

const memberAPI = '/members/';

class MemberService implements Service<IMember> {
  get = (queryString: string = '', config?: any) =>
    client.get<ResponseListDataType<IMember>>(memberAPI + queryString, config);

  getSingle = (id: string | number, config?: any) => client.get<IMember>(memberAPI + id, config);

  add = (body: IMember, config?: any) => {
    return client.post<IMember>(memberAPI, body, config);
  };

  update = (id: string | number, body: IMember, config?: any) => client.put<IMember>(memberAPI + id, body, config);

  remove = (id: string | number, config?: any) => client.delete<IMember>(memberAPI + id);
}

export default new MemberService();
