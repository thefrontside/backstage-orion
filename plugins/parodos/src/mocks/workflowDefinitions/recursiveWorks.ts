import { WorkflowDefinition } from '../../models/workflowDefinitionSchema';

export const mockRecursiveWorksWorkflowDefinition: WorkflowDefinition = {
  id: 'ea22c6ed-b7d4-48bf-98d2-f7c1c78643d8',
  name: 'subWorkFlowTwo',
  type: 'INFRASTRUCTURE',
  processingType: 'SEQUENTIAL',
  author: null,
  createDate: '2023-03-14T16:40:17.001+00:00',
  modifyDate: '2023-03-14T16:40:17.001+00:00',
  works: [
    {
      id: '981b027c-3891-4a1b-9c5d-de2d641884ba',
      name: 'subWorkFlowOne',
      workType: 'WORKFLOW',
      processingType: 'PARALLEL',
      works: [
        {
          id: '684d5cc0-3da7-4b18-9712-a60622748c5a',
          name: 'adGroupsWorkFlowTask',
          workType: 'TASK',
          parameters: [
            {
              description: 'The ad groups',
              optional: false,
              type: 'TEXT',
              key: 'adGroups',
            },
            {
              description: 'The user id',
              optional: false,
              type: 'TEXT',
              key: 'userId',
            },
            {
              key: 'param2',
              description: 'An URL parameter',
              optional: true,
              type: 'URL',
            },
            {
              key: 'param3',
              description: 'Date parameter type.',
              optional: false,
              type: 'DATE',
            },
            {
              key: 'param4',
              description: 'Email parameter',
              optional: true,
              type: 'EMAIL',
            },
            {
              key: 'param7',
              description: 'Select parameter',
              optional: false,
              type: 'MOCK-SELECT',
              options: [
                { key: 'option1', value: 'Option 1' },
                { key: 'option2', value: 'Option 2' },
              ],
            },
          ],
          outputs: ['HTTP2XX', 'EXCEPTION'],
        },
        {
          id: '09d93c82-8865-45fe-9348-bd6ef5b9aeb3',
          name: 'splunkMonitoringWorkFlowTask',
          workType: 'TASK',
          parameters: [
            {
              description: 'The cluster name',
              optional: false,
              type: 'TEXT',
              key: 'clusterName',
            },
            {
              description: 'The hostname',
              optional: false,
              type: 'TEXT',
              key: 'hostname',
            },
          ],
          outputs: ['OTHER'],
        },
      ],
      parameters: [
        {
          key: 'comment',
          type: 'TEXT',
          description: 'The workflow comment',
          optional: false,
        },
      ],
    },
    {
      id: 'e8d23ee9-8406-423c-beb7-c4e4f3ba0a21',
      name: 'namespaceWorkFlowTask',
      workType: 'TASK',
      parameters: [
        {
          description: 'The project id',
          optional: false,
          type: 'NUMBER',
          key: 'projectId',
        },
      ],
      outputs: ['HTTP2XX'],
    },
  ],
};
