import Button from '@material-ui/core/Button';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Table from '@material-ui/core/Table/Table';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import Typography from '@material-ui/core/Typography';
import { decrementCounter, incrementCounter, killSkywalker } from 'features/counter/actions';
import { getCount, getSkywalkers } from 'features/counter/selectors';
import { RootState } from 'features/redux/root-reducer';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Skywalker, SwApiSkywalkersResponse } from '../../features/counter/models';

const styles = (theme: Theme) => createStyles({
  textColor: {
    color: theme.palette.primary.main,
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

interface StateProps {
  skywalkers: SwApiSkywalkersResponse;
  count: number;
}

interface DispatchProps {
  onDecrement: () => void;
  onIncrement: () => void;
  onKillSkywaker: (index: number) => void;
}

type Props = StateProps & DispatchProps & WithStyles<typeof styles>;

class Counter extends PureComponent<Props> {
  render() {
    const { classes, skywalkers } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h2" align={'center'} className={classes.textColor}>
          Skywalkers: {skywalkers.results.length}
        </Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Height</TableCell>
              <TableCell>Mass</TableCell>
              <TableCell>Hair color</TableCell>
              <TableCell>Skin color</TableCell>
              <TableCell>Eye color</TableCell>
              <TableCell>Birth year</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {skywalkers.results.map((skywalker: Skywalker, index: number) => (
              <TableRow key={index}>
                <TableCell>{skywalker.name}</TableCell>
                <TableCell>{skywalker.height}</TableCell>
                <TableCell>{skywalker.mass}</TableCell>
                <TableCell>{skywalker.hair_color}</TableCell>
                <TableCell>{skywalker.skin_color}</TableCell>
                <TableCell>{skywalker.eye_color}</TableCell>
                <TableCell>{skywalker.birth_year}</TableCell>
                <TableCell>{skywalker.gender}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.props.onKillSkywaker(index)}
                  >Kill
                  </Button>
                </TableCell>
              </TableRow>
          ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const skywalkers = getSkywalkers(state);
  const count = getCount(state);

  return {
    skywalkers,
    count,
  };
};

const mapDispatchToProps = {
  onDecrement: decrementCounter,
  onIncrement: incrementCounter,
  onKillSkywaker: killSkywalker,
};

export default connect<StateProps, DispatchProps, {}, RootState>(mapStateToProps, mapDispatchToProps)
  (withStyles(styles)(Counter));
