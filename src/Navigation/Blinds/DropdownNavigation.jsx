import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Button, Grid } from '@material-ui/core';
import Dropdown from './Dropdown';
import useStyles from './useStyles';

const DropdownNavigation = React.forwardRef(
  ({ item }, ref) => {
    const { a } = useStyles();
    const shouldRenderDropdown =
      Array.isArray(item.items) && item.items.length > 0;

    return (
      <Grid item component="li">
        {!shouldRenderDropdown ? (
          <Button
            component={Link}
            to={item.href}
            className={a}
          >
            {item.label}
          </Button>
        ) : (
          <Dropdown item={item} ref={ref} />
        )}
      </Grid>
    );
  },
);

DropdownNavigation.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};

export default DropdownNavigation;
