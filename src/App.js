import 'carbon-components/scss/globals/scss/styles.scss';
import React, { Component } from 'react';
import './App.css';
import './app.scss';
// import { Content } from 'carbon-components-react';
import { Content, DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell} from 'carbon-components-react';
import Header from './components/Header';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      projects: [],
    }
  }

  // GET all the projects
  componentDidMount(){
    axios.get("https://saturn-dev.pok.stglabs.ibm.com/api/projects/22/virtualmachines",
    { 
    headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
    )
      .then(response => {
        console.log(response)
        this.setState({projects: response.data})
      })

      // .then(data => console.log("FROM THE SECOND THEN", data))
      .catch(error => {
        console.error(error)
      })
  }


// render displays the datatable for projects
  render() {
    // const rows = [
    //   {
    //     id: 'a',
    //     vm: 'vm 1',
    //     status: 'Disabled',
    //     os: 'linux',
    //     ipAddress: 47832,
    //     owner: 'mike'
    //   },
    //   {
    //     id: 'b',
    //     vm: 'vm 2',
    //     status: 'Starting',
    //     os: 'linux',
    //     ipAddress: 34324,
    //     owner: 'sam'
    //   },
    //   {
    //     id: 'c',
    //     vm: 'vm 3',
    //     status: 'Active',
    //     os: 'linux',
    //     ipAddress: 34324,
    //     owner: 'eric'
    //   },
    // ];
    const headers = [
      {
        key: 'vmname',
        header: 'VM',
      },
      {
        key: 'state',
        header: 'Status',
      },
      {
        key: 'os',
        header: 'OS',
      },
      {
        key: 'ipaddr',
        header: 'IP Address',
      },
      {
        key: 'firstname',
        header: 'Owner',
      }
    ];
    const { projects } = this.state

    console.log(projects);

    // {projects.map((e, idx) => <li>key={idx}{e.vmname}</li>)}
    return (
      <>
        <Header />
        <Content>
          <h2>Project tables</h2>
         <DataTable rows={projects} headers={headers}>
            {({
              rows,
              headers,
              getHeaderProps,
              getRowProps,
              getTableProps,
              getTableContainerProps,
            }) => (
              <TableContainer
                title="DataTable"
                {...getTableContainerProps()}>
                <Table {...getTableProps()} isSortable>
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => (
                        <TableHeader
                          id={header.key}
                          key={header.key}
                          {...getHeaderProps({ header })}
                          isSortable>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow 
                        key={row.id} 
                        {...getRowProps({ row })}>
                          {/* {console.log(row)} */}
                        {row.cells.map((cell) => (
                          <>
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          </>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DataTable>  
        </Content>
      </>
    )
  }
};

export default App;
