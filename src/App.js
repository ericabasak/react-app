import React, { Component } from 'react';
import './app.scss';
import { 
  Content, 
  DataTable, 
  TableContainer, 
  Table, 
  TableHead, 
  TableRow, 
  TableHeader, 
  TableBody, 
  TableCell, 
  TableToolbar, 
  TableToolbarSearch,
  TableToolbarContent,
  Button,
  Grid,
  Row,
  Column
} from 'carbon-components-react';
import Header from './components/Header';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      projects: [],
      value: ""
    }
  }

  // GET all the projects
  getVMs() { 
    axios.get("https://saturn-dev.pok.stglabs.ibm.com/api/projects/22/virtualmachines",
    { 
    headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
    )
      .then(response => {
        console.log(response)
        this.setState({projects: response.data});
      })

      // .then(data => console.log(data))
      .catch(error => {
        console.error(error)
      })
  }

  handleChange = e => {
    if (e.target.value.length === 0) {
      this.getVMs();
      return;
    }
    this.setState({value: e.target.value});
    let filteredProjects = this.state.projects.filter(p => p.vmname.includes(e.target.value));
    console.log(filteredProjects);
    this.setState({
      projects: filteredProjects
    });
  }



// render displays the datatable for projects
  render() {
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

    // collect what user has entered in the search bar
  // const filteredProjects = (e) => {
  //   this.setState({
  //     value: e.target.value
  //   })
  // }

  



    // {projects.map((e, idx) => <li>key={idx}{e.vmname}</li>)}

    // {projects.filter(p => p.name === "kjk-transfer-test-1").map(filteredProjects => (
    //   <li>
    //     {filteredProjects.name}
    //   </li>
    // ))}

    // let filteredProjects = projects.filter(p => p.vmname === "kjk-vm7")

    return (
     
      <div>
        <Header />
        <Content>
          <Grid fullWidth>
            <Row>
              <Column>
              <h2>Project tables</h2>
         <DataTable rows={projects} headers={headers}>
            {({
              rows,
              headers,
              getHeaderProps,
              getRowProps,
              getToolbarProps,
              getTableProps,
              getTableContainerProps,
              getBatchActionProps
            }) => (
              <TableContainer title="DataTable" {...getTableContainerProps()}>
                  <TableToolbar {...getToolbarProps()} >
                  <TableToolbarContent>
                  <TableToolbarSearch />
                  <Button>Refresh</Button>
                </TableToolbarContent>
                  </TableToolbar>
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
              </Column>
            </Row>
          </Grid>
        
        </Content>
      </div>
    )
  }
};

export default App;
