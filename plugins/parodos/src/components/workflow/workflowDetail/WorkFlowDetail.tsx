import { ParodosPage } from '../../ParodosPage';
import {
  ContentHeader,
  Progress,
  SupportButton,
} from '@backstage/core-components';
import { Box, Chip, makeStyles, Typography } from '@material-ui/core';
import { WorkFlowLogViewer } from './WorkFlowLogViewer';
import React, { useEffect, useState } from 'react';
import { WorkFlowStepper } from './topology/WorkFlowStepper';
import { useLocation, useParams } from 'react-router-dom';
import { WorkFlowTask } from './topology/type/WorkFlowTask';
import { mockLog } from './topology/mock/mockLog';
import * as urls from '../../../urls';
import { useBackendUrl } from '../../api';


const useStyles = makeStyles(_theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  badge: {
    alignSelf: 'flex-start',
  },
  detailContainer: {
    flex: 1,
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    minHeight: 0,
  },
  viewerContainer: {
    display: 'grid',
    minHeight: 0,
  },
}));

export const WorkFlowDetail = () => {
  const { executionId } = useParams();
  const { state } = useLocation();
  const { isNew, initTasks } = state;
  const [selectedTask, setSelectedTask] = useState<string | null>('');
  const [allTasks, setAllTasks] = useState<WorkFlowTask[]>(initTasks);
  const [log, setLog] = useState<string>(``);
  const [countlog, setCountlog] = useState<number>(0);
  const backendUrl = useBackendUrl();
  const styles = useStyles();

  const getSelectedTaskLog = React.useCallback(
    (templog: string) => {
      // TODO  api call to get a task log from Workflow Execution Id
      if (selectedTask !== '') setLog(templog);
    },
    [selectedTask],
  );

  // update task state regularly
  useEffect(() => {
    const updateWorkflowExecutionState = async () => {
      // TODO api call to get subsequent execution CHAIN detail
      const data = await fetch(`${backendUrl}${urls.Workflows}`);

      const response = (await data.json()) as WorkFlowTask[];
      const result: WorkFlowTask[] = [
        {
          id: 'Project Information',
          status: 'completed',
          locked: false,
          label: 'Project Information',
          runAfterTasks: [],
        },
        ...response,
      ];
      return result;
    };
    const taskInterval = setInterval(() => {
      updateWorkflowExecutionState().then(updatedTasks => {
        if (updatedTasks !== allTasks) setAllTasks(updatedTasks);
      });
    }, 5000);

    return () => clearInterval(taskInterval);
  }, [allTasks, backendUrl, executionId]);

  // update log of selected task regularly
  useEffect(() => {
    getSelectedTaskLog(
      `checking logs for ${selectedTask?.toUpperCase()}:${countlog} in execution: ${executionId}\n${mockLog}`,
    );
    const logInterval = setInterval(() => {
      let test: string = '';
      for (let i = 0; i < countlog; i++) {
        test = `${test}\nmock log line ${i}`;
      }
      getSelectedTaskLog(
        `checking logs for ${selectedTask?.toUpperCase()}:${countlog} in execution: ${executionId}\n${mockLog}${test}`,
      );
      setCountlog(countlog + 1);
    }, 3000);

    return () => clearInterval(logInterval);
  }, [countlog, executionId, getSelectedTaskLog, selectedTask]);

  return (
    <ParodosPage className={styles.container}>
      {isNew && (
        <Chip
          className={styles.badge}
          label="New application"
          color="secondary"
        />
      )}
      <ContentHeader title="Onboarding">
        <SupportButton title="Need help?">Lorem Ipsum</SupportButton>
      </ContentHeader>
      <Typography paragraph>
        You are onboarding: org-name/new-project. Execution Id is {executionId}
      </Typography>

      <Box className={styles.detailContainer}>
      {allTasks.length > 0 ? (
        <WorkFlowStepper tasks={allTasks} setSelectedTask={setSelectedTask} />
      ) : (
        <Progress />
      )}
        <div className={styles.viewerContainer}>
          {log !== '' && <WorkFlowLogViewer log={log} />}
        </div>
      </Box>
    </ParodosPage>
  );
};
