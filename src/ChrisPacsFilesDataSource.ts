import ChrisAndPfdcmClient from './client';
import { DicomMetadataStore, IWebApiDataSource, utils, errorHandler, classes } from '@ohif/core';


function createChrisPacsDataSource() {
  // const pfdcmUrl = 'http://rc-golden.tch.harvard.edu:30031';
  // const pfdcmService = 'PACSDCM';
  const pfdcmUrl = 'http://localhost:4005'
  const pfdcmService = 'orthanc';
  const cubeUrl = 'http://localhost:8000/api/v1/';
  const cubeToken = 'c615cc32850c603b34d08a5e0d189e5b65ec310d'
  const client = new ChrisAndPfdcmClient(cubeUrl, cubeToken, pfdcmUrl, pfdcmService);

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
          console.log('getting metadata...');

          const instancesData = await client.getInstances(StudyInstanceUID);

          const seriesSummaryMetadata = cubePacsfilesToSeriesSummaryMetadata(instancesData);
          DicomMetadataStore.addSeriesMetadata(seriesSummaryMetadata, madeInClient);

          const naturalizedInstances = instancesData.map(cubePacsfileToNaturalizedInstance);
          DicomMetadataStore.addInstances(naturalizedInstances, madeInClient);
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

function cubePacsfileToNaturalizedInstance(pacsfile) {
  const url = `dicomweb:${pacsfile.file_resource}`;
  return {
    // "Columns": 512,
    // "Rows": 512,
    // "InstanceNumber": 1,
    // "SOPClassUID": "1.2.840.10008.5.1.4.1.1.2",
    // "PhotometricInterpretation": "MONOCHROME2",
    // "BitsAllocated": 16,
    // "BitsStored": 16,
    // "PixelRepresentation": 1,
    // "SamplesPerPixel": 1,
    // "PixelSpacing": [0.703125, 0.703125],
    // "HighBit": 15,
    // "ImageOrientationPatient": [1, 0, 0, 0, 1, 0],
    // "ImagePositionPatient": [-166, -171.699997, -10],
    // "FrameOfReferenceUID": "1.3.6.1.4.1.14519.5.2.1.6279.6001.229925374658226729607867499499",
    // "ImageType": ["ORIGINAL", "PRIMARY", "AXIAL"],
    "Modality": pacsfile.Modality,
    // "SOPInstanceUID": "1.3.6.1.4.1.14519.5.2.1.6279.6001.262721256650280657946440242654",
    "SeriesInstanceUID": pacsfile.SeriesInstanceUID,
    "StudyInstanceUID": pacsfile.StudyInstanceUID,
    // "WindowCenter": -600,
    // "WindowWidth": 1600,
    "SeriesDate": pacsfile.StudyDate.replaceAll('-', ''),
    "url": url,
    "imageId": url,
    // "SeriesNumber": 3000566,
    // "SliceThickness": 2.5,
    "StudyDate": pacsfile.StudyDate.replaceAll('-', ''),
    "StudyTime": "",
    "PatientName": pacsfile.PatientName,
    "PatientID": pacsfile.PatientID,
    "AccessionNumber": pacsfile.AccessionNumber,
    "PatientAge": pacsfile.PatientAge,
    "PatientSex": pacsfile.PatientSex,
    // "NumInstances": 0, // TODO
    "Modalities": pacsfile.Modality
  }
}

export { createChrisPacsDataSource }
