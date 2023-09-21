import ChrisAndPfdcmClient, { PypxSeriesMetadata } from './client';
import { DicomMetadataStore, IWebApiDataSource, utils, errorHandler, classes } from '@ohif/core';


function createChrisPacsDataSource() {
  // const pfdcmUrl = 'http://rc-golden.tch.harvard.edu:30031';
  // const pfdcmService = 'PACSDCM';
  const pfdcmUrl = 'http://localhost:4005'
  const pfdcmService = 'orthanc';
  const cubeUrl = 'http://localhost:8000/api/v1/';
  const cubeToken = 'c615cc32850c603b34d08a5e0d189e5b65ec310d';
  const pypxfsServer = 'http://localhost:4080';
  const client = new ChrisAndPfdcmClient(cubeUrl, cubeToken, pfdcmUrl, pfdcmService, pypxfsServer);

  return {
    initialize: ({ params, query }) => {
      console.debug('initialize was called with ', params, query);
    },
    query: {
      studies: {
        // hard-coded default MRN for sag-anon
        search: async function ({ pageNumber = 1, resultsPerPage = 25, offset = 0, patientId = '1449c1d', ...otherSearchParams } = {}) {
          const pypxStudies = await client.queryStudies(patientId);
          return pypxStudies.map(pypxStudyToOhif);
        },
      },
      series: {
        // mapParams: null,
        search: async function (studyInstanceUid) {
          let pypxSeries = await client.getSeries(studyInstanceUid);
          return pypxSeries.map(pypxSeriesToOhif);
        }
      },
    },
    retrieve: {
      // bulkDataURI: async ({ StudyInstanceUID, BulkDataURI }) => {
      //   return null;
      // },
      series: {
        // retrieve.series.metadata tells OHIF the CUBE URLs of DICOM instances of a study
        metadata: async ({ StudyInstanceUID = null, madeInClient = false} = {}) => {
          // ls /home/dicom/log/studyData/X.X.X.XXXXXXXXX-series/
          const seriesInstanceUids = await client.lsSeries(StudyInstanceUID);

          const seriesMetas = await Promise.all(seriesInstanceUids.map((SeriesInstanceUID) => {
            // cat /home/dicom/log/studyData/X.X.X.XXXXXXXXX-series/X.X.X.XXXXXXXXX-meta.json
            return client.getSeriesMeta(StudyInstanceUID, SeriesInstanceUID)
          }));

          const promises = seriesMetas.map((seriesMeta) => {
            return getNaturalizedInstances(client, seriesMeta).then((naturalizedInstances) => {
              console.log('calling DicomMetadataStore.addInstances');
              console.dir(naturalizedInstances);
              DicomMetadataStore.addInstances(naturalizedInstances, madeInClient);
            })
          });
          await Promise.all(promises);
        }
      }
    },
    // store: {dicom: null},
    // reject: {},
    // deleteStudyMetadataPromise: function(StudyInstanceUID) {
    //   return null;
    // }

    /**
     * This entire method is copy-pasted
     */
    getStudyInstanceUIDs({ params, query }) {
      const { StudyInstanceUIDs: paramsStudyInstanceUIDs } = params;
      const queryStudyInstanceUIDs = utils.splitComma(query.getAll('StudyInstanceUIDs'));

      const StudyInstanceUIDs =
        (queryStudyInstanceUIDs.length && queryStudyInstanceUIDs) || paramsStudyInstanceUIDs;
      const StudyInstanceUIDsAsArray =
        StudyInstanceUIDs && Array.isArray(StudyInstanceUIDs)
          ? StudyInstanceUIDs
          : [StudyInstanceUIDs];

      return StudyInstanceUIDsAsArray;
    },
    /**
     * This entire method is copy-pasted
     */
    getImageIdsForDisplaySet(displaySet) {
      console.log('displaySets were already created, my length is ', displaySet.images.length)
      return displaySet.images.map(pacsfile => pacsfile.id);
    },
  }
}

// Helper functions which map objects from pypx and CUBE to OHIF internal types
// ----------------------------------------------------------------------------

function pypxStudyToOhif(study) {
  return {
    studyInstanceUid: study.StudyInstanceUID.value,
    date: study.StudyDate.value,
    time: '000000.000', // HHmmss.SSS (24-hour, minutes, seconds, fractional seconds)
    accession: study.AccessionNumber.value, // short string, probably a number?
    mrn: study.PatientID.value, // medicalRecordNumber
    patientName: study.PatientName.value,
    instances: Number(study.NumberOfStudyRelatedInstances.value), // number
    description: study.StudyDescription.value,
    modalities: study.ModalitiesInStudy.value,
  }
}

function pypxSeriesToOhif(series) {
  return {
    studyInstanceUid: series.StudyInstanceUID.value,
    seriesInstanceUid: series.SeriesInstanceUID.value,
    modality: series.Modality.value,
    seriesNumber: series.uid.value,
    seriesDate: series.StudyDate.value,
    numSeriesInstances: Number(series.NumberOfSeriesRelatedInstances.value),
    description: series.SeriesDescription.value,
  }
}

function cubePacsfilesToSeriesSummaryMetadata(instancesData) {
  return selectOneInstanceOfEachSeries(instancesData).map(cubePacsfileToSeriesSummaryMetadata);
}

function selectOneInstanceOfEachSeries(instancesData) {
  const entries = instancesData.map(instance => [instance.SeriesInstanceUID, instance]);
  const mapping = Object.fromEntries(entries);
  return Object.values(mapping)
}

function cubePacsfileToSeriesSummaryMetadata(pacsfile) {
  return {
    Modality: pacsfile.Modality,
    SeriesInstanceUID: pacsfile.SeriesInstanceUID,
    SeriesNumber: pacsfile.SeriesNumber,
    SliceThickness: 1,  // CUBE does not know slice thickness!
    StudyInstanceUID: pacsfile.StudyInstanceUID,
  }
}

async function getNaturalizedInstances(client: ChrisAndPfdcmClient, studyMeta: PypxSeriesMetadata): Promise<any[]> {
  console.debug(studyMeta);
  const instances = await client.getInstances(studyMeta.SeriesBaseDir);
  return instances.map((instance) => {
    const url = 'dicomweb:' + instance.url;
    return {
      Columns: studyMeta.DICOM.Columns.value,
      Rows: studyMeta.DICOM.Rows.value,
      InstanceNumber: instance.number,
      SOPClassUID: studyMeta.DICOM.SOPClassUID.value,

      // TODO LEFT OFF HERE

      ImageType: studyMeta.DICOM.ImageType.value,
      Modality: studyMeta.DICOM.Modality.value,
      SOPInstanceUID: studyMeta.DICOM.SOPInstanceUID.value,
      SeriesInstanceUID: studyMeta.DICOM.SeriesInstanceUID.value,
      StudyInstanceUID: studyMeta.DICOM.StudyInstanceUID.value,


      url: url,
      imageId: url,
      NumInstances: instances.length,

    };
  });
}

function serializePypxDicomTags(data) {
  const entries = Object.values(data).map(tag => [tag.label, tryParseJson(tag.value)]);
  return Object.fromEntries(entries);
}

function tryParseJson(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
}

export { createChrisPacsDataSource }
