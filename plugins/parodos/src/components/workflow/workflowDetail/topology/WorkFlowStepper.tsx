import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { PipelineLayout } from './PipelineLayout';
import { makeStyles } from '@material-ui/core';
import { WorkFlowTask } from './type/WorkFlowTask';
import cs from 'classnames';

const useStyles = makeStyles(theme => ({
  pfRi__topologyDemo: {
    '& .pf-topology-visualization-surface__svg': {
      background: theme.palette.background.default,
    },
  },
}));

type Props = {
  tasks: WorkFlowTask[];
  setSelectedTask: (selectedTask: string) => void;
  className?: string;
};

export const WorkFlowStepper = ({className, ...props}: Props) => {
  const classes = useStyles();
  return (
    <div className={cs(className, classes.pfRi__topologyDemo)}>
      <PipelineLayout {...props} />
    </div>
  );
};
