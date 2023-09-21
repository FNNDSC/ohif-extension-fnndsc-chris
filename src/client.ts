import Client from '@fnndsc/chrisapi';
import { Configuration, PACSQRServicesApi, PACSqueryCore } from './pfdcm-openapi-typescript-client';


export default class ChrisAndPfdcmClient {
  private chris: Client;
  private pacsQR: PACSQRServicesApi;
  private pacsService: string;

  constructor(cubeUrl: string, cubeToken: string, pfdcmUrl: string, pacsService: string) {
    this.chris = new Client(cubeUrl, { token: cubeToken });

    const pfdcmConfig = new Configuration({ basePath: pfdcmUrl });
    this.pacsService = pacsService;
    this.pacsQR = new PACSQRServicesApi(pfdcmConfig);
  }

  private async syncPypxPost(pacsDirective: PACSqueryCore) {
    const res = await this.pacsQR.pACSPypxApiV1PACSSyncPypxPost({
      bodyPACSPypxApiV1PACSSyncPypxPost: {
        pACSservice: { value: this.pacsService },
        listenerService: { value: 'default' },
        pACSdirective: pacsDirective
      }
    });
    if (res.status !== true) {
      throw Error('pfdcm status is not true')
    }
    return res;
  }

  async queryStudies(patientId: string) {
    const query = { patientID: patientId };
    const res = await this.syncPypxPost(query);
    return res.pypx.data;
  }

  async getSeries(studyInstanceUid): Promise<object[]> {
    const query = {
      studyInstanceUID: studyInstanceUid,
      // then: 'status'
    };
    const res = await this.syncPypxPost(query);
    return res.pypx.data[0].series;
  }

  async getInstances(StudyInstanceUID): Promise<object[]> {
    const chrisClientRes = await this.chris.getPACSFiles({limit: 5000, StudyInstanceUID});
    return unCollectionJson(chrisClientRes);
  }

}

function unCollectionJson(res): object[] {
  return res.collection.items.map(item => {
    return Object.fromEntries(item.data.map(data => [data.name, data.value]))
  })
}
