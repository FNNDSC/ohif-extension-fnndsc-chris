import Client from '@fnndsc/chrisapi';
import { Configuration, PACSQRServicesApi, PACSqueryCore } from './pfdcm-openapi-typescript-client';

const GET_JSON_OPTIONS = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
}

export default class ChrisAndPfdcmClient {
  private chris: Client;
  private pacsQR: PACSQRServicesApi;
  private pacsService: string;
  private pypxfsurl: string;

  constructor(cubeUrl: string, cubeToken: string, pfdcmUrl: string, pacsService: string, pypxfsurl: string) {
    this.chris = new Client(cubeUrl, { token: cubeToken });

    const pfdcmConfig = new Configuration({ basePath: pfdcmUrl });
    this.pacsService = pacsService;
    this.pacsQR = new PACSQRServicesApi(pfdcmConfig);

    this.pypxfsurl = pypxfsurl;
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

  // async queryInstances(studyInstanceUID: string) {
  //   const query = { studyInstanceUID: studyInstanceUID, then: 'status' };
  //   const res = await this.syncPypxPost(query);
  //   return res.pypx;
  // }

  async getSeries(studyInstanceUid): Promise<any[]> {
    const query = {
      studyInstanceUID: studyInstanceUid,
      // then: 'status'
    };
    const res = await this.syncPypxPost(query);
    return res.pypx.data[0].series;
  }

  async getInstancesFromCUBE(StudyInstanceUID): Promise<any[]> {
    const chrisClientRes = await this.chris.getPACSFiles({limit: 5000, StudyInstanceUID});
    return unCollectionJson(chrisClientRes);
  }

  async lsSeries(StudyInstanceUID): Promise<string[]> {
    const url = `${this.pypxfsurl}/log/studyData/${StudyInstanceUID}-series/`;
    const res = await fetch(url, GET_JSON_OPTIONS);
    const data = await res.json();
    return data.map(entry => entry.name.split('-')[0]);
  }

  async getSeriesMeta(StudyInstanceUID, SeriesInstanceUID): Promise<PypxSeriesMetadata> {
    const url = `${this.pypxfsurl}/log/studyData/${StudyInstanceUID}-series/${SeriesInstanceUID}-meta.json`;
    const res = await fetch(url, GET_JSON_OPTIONS);
    const data = await res.json();
    // @ts-ignore
    return Object.values(data)[0];
  }

  async getInstances(fsLocation: string): Promise<PypxFsDicomInstance[]> {
    const relFsLocation = fsLocation.substring('/home/dicom/'.length);
    const url = `http://localhost:4080/${relFsLocation}/`;
    const res = await fetch(url, GET_JSON_OPTIONS);
    const data = await res.json();
    return data.map(({ name }) => {
      return {
        name: name,
        url: url + name,
        number: parseInt(name.split('-')[0]),
      }
    });
  }
}

type PypxFsDicomInstance = {
  name: string,
  url: string,
  number: number
}

type PypxSeriesMetadata = {
  SeriesInstanceUID: string;
  SeriesBaseDir: string;
  DICOM: any
}

function unCollectionJson(res): object[] {
  return res.collection.items.map(item => {
    return Object.fromEntries(item.data.map(data => [data.name, data.value]))
  })
}

export { PypxFsDicomInstance, PypxSeriesMetadata };
