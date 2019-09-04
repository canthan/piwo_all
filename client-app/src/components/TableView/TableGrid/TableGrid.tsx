import React from 'react';
import { connect } from 'react-redux';
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";

import { OverallAppState } from '../../../reducers/initialState';
import { dateInStandardFormat } from '../../../utils/utils.service';
import { Batch, Stash } from '../../../types/storage.types';

import './TableGrid.scss';

interface MappedProps {
  batches: Batch[];
  stashes: Stash[];
}

type Props = MappedProps;

export const TableGrid = (props: Props) => {

  const columns = ["Batch number", "Batch name", "Bottled on", "Litres", "Bottles 0,5l", 'Bottles small', 'Crates'];
  const data = props.batches.map(batch => [
    batch.batchNo,
    batch.name,
    dateInStandardFormat(batch.bottledOn),
    batch.quantityLitres.toFixed(2),
    batch.quantityBottles,
    batch.quantityBottlesSmall,
    batch.quantityCrates.toFixed(2),
  ]);

  const options: MUIDataTableOptions = {
    responsive: 'stacked',
    downloadOptions: { filename: 'tableview.csv', separator: ';' },
    rowsPerPage: 20,
    rowsPerPageOptions: [20, 40, 100],
  }

  return (
    <MUIDataTable
      title="Batch View"
      data={data}
      columns={columns}
      options={options}
    />
  );
};

const mapStateToProps = ({ batches, stashes, summary }: OverallAppState) => ({
  batches: batches.batches,
  stashes: stashes.stashes,
  summary: summary.summary,
});

const actions = {}

export default connect(mapStateToProps, actions)(TableGrid);
