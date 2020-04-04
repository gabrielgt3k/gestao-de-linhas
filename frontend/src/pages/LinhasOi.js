import React, { useState, useEffect, useCallback } from 'react';
import MUIDataTable from 'mui-datatables';

import {
  CircularProgress,
  Typography,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core';

import DialogForm from '../components/DialogForm';
import api from '../services/api';

const LinhasOi = () => {
  const [data, setData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [tempLinha, setTempLinha] = useState({
    id: 0,
    numero: '',
    dono_linha: '',
    email_dono: '',
    loja: '',
    status: '',
  });

  useEffect(() => {
    async function loadData() {
      setLoadingTable(true);
      const response = await api.get('/linhas');
      setData(response.data);
      setLoadingTable(false);
    }

    loadData();
  }, []);
  function getUpdatedList(linha, add = true) {
    let list = data.filter(l => l.id !== linha.id);
    if (add) list = [...list, linha];
    return list;
  }

  const obtemTempLinha = useCallback(linha => {
    setTempLinha({ ...linha });
  }, []);

  useEffect(() => {
    function updateTable() {
      if (tempLinha.id !== 0) {
        setData(getUpdatedList(tempLinha));
      }
    }

    console.log(data);

    updateTable();
  }, [tempLinha]);

  const getCurrentLinha = tableData => {
    const linha = {
      id: tableData[0],
      numero: tableData[1],
      dono_linha: tableData[2],
      email_dono: tableData[3],
      loja: tableData[4],
      status: tableData[5],
    };

    return linha;
  };

  const columns = [
    {
      name: 'id',
      label: 'Id',
      options: {
        print: false,
        searchable: false,
        download: false,
        viewColumns: false,
        filter: false,
        sort: false,
        // display: 'excluded',
      },
    },
    {
      name: 'numero',
      label: 'Número',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'dono_linha',
      label: 'Titular da Linha',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'email_dono',
      label: 'E-mail',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'loja',
      label: 'Loja',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'Editar',
      options: {
        filter: false,
        sort: false,
        print: false,
        searchable: false,
        download: false,
        viewColumns: false,
        empty: true,
        customBodyRender: (value, tableMeta) => (
          <>
            <DialogForm
              data={{ obtemTempLinha: obtemTempLinha.bind(this) }}
              linha={getCurrentLinha(tableMeta.rowData)}
              isEditing
            />
          </>
        ),
      },
    },
  ];

  // ARRUMAR API PARA ORDENAR DECRESCENTE

  const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'stacked',
    onRowsDelete: async rowsDeleted => {
      const idsToDelete = rowsDeleted.data.map(d => data[d.dataIndex].id);

      await idsToDelete.forEach(id => {
        api.delete(`/linhas/${id}`);
      });

      const linhasExcluidas = data.filter(
        linha => idsToDelete.indexOf(linha.id) !== -1
      );

      const resultLinhas = data.filter(f => !linhasExcluidas.includes(f));

      setData(resultLinhas);
    },
    selectableRowsHeader: false,
    textLabels: {
      body: {
        noMatch: 'Nenhum registro encontrado',
        toolTip: 'Ordenar',
      },
      pagination: {
        next: 'Próxima Página',
        previous: 'Página anterior',
        rowsPerPage: 'Registros por página:',
        displayRows: 'de',
      },
      toolbar: {
        search: 'Pesquisar',
        downloadCsv: 'Exportar para Excel',
        print: 'Imprimir',
        viewColumns: 'Ver colunas',
        filterTable: 'Filtros',
      },
      filter: {
        all: 'Todos',
        title: 'FILTROS',
        reset: 'LIMPAR',
      },
      viewColumns: {
        title: 'Exibir colunas',
        titleAria: 'Exibir/Ocultar colunas',
      },
      selectedRows: {
        text: 'registro(s) selecionado(s)',
        delete: 'Excluir',
        deleteAria: 'Excluir registros selecionados',
      },
    },
  };

  const theme = createMuiTheme({
    overrides: {
      MuiTableRow: {
        hover: { '&$root': { '&:hover': { backgroundColor: '#e9e9e9' } } },
        root: {
          '&$selected': {
            backgroundColor: '#e9e9e9',
          },
        },
      },
    },
  });

  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <DialogForm data={{ obtemTempLinha: obtemTempLinha.bind(this) }} />
      </div>
      <MuiThemeProvider theme={theme}>
        <MUIDataTable
          title={
            <Typography variant="h6">
              Linhas telefônicas
              {loadingTable && (
                <CircularProgress
                  size={24}
                  style={{ marginLeft: 15, position: 'relative', top: 4 }}
                />
              )}
            </Typography>
          }
          data={data}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    </>
  );
};

export default LinhasOi;
