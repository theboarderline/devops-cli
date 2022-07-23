import * as React from 'react';
import {
  GridList,
  GridListTile,
  withWidth,
  isWidthUp
} from '@material-ui/core';
import './styles.scss';

type breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type columnsType = { [key in breakpoints]?: number };

interface GridItems {
  id: string;
  content: JSX.Element;
  cols: columnsType;
  rows: number;
}

interface WidthProps {
  width: breakpoints;
}

export interface GridProps extends WidthProps {
  items: GridItems[];
}

const Grid: React.FC<GridProps> = ({ width, items }) => {
  const getGridListCols = (cols: columnsType): number => {
    if (cols.xl && isWidthUp('xl', width)) {
      return cols.xl;
    }

    if (cols.lg && isWidthUp('lg', width)) {
      return cols.lg;
    }

    if (cols.md && isWidthUp('md', width)) {
      return cols.md;
    }

    if (cols.sm && isWidthUp('sm', width)) {
      return cols.sm;
    }

    if (cols.xs && isWidthUp('xs', width)) {
      return cols.xs;
    }
    return 1;
  };

  return (
    <GridList cols={12} style={{ margin: 0 }} className="cgs--grid" cellHeight="auto">
      {items.map(({ cols, rows, id, content }) => (
        <GridListTile
          cols={getGridListCols(cols)}
          rows={rows}
          key={id}
          className="cgs--grid-tile"
        >
          {content}
        </GridListTile>
      ))}
    </GridList>
  );
};

export default withWidth()(Grid);
