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
  // TableToolbar, 
  // TableToolbarSearch,
  // TableToolbarContent,
  // Button,
  Grid,
  Row,
  Column,
  Dropdown
} from 'carbon-components-react';
import Header from './components/Header';
import axios from 'axios';

class Projects extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      projects: [],
      value: ""
    }
  }

  // GET all the projects
  componentDidMount(){
    this.getVMs();
  }

  getVMs() { 
    axios.get("https://saturn-dev.pok.stglabs.ibm.com/api/projects/22/virtualmachines", { 
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }).then(response => {
            console.log(response)
            this.setState({projects: response.data});
      })
      .catch(error => {
        console.error(error)
      })
  }

  // handlechange for the search bar
  handleChange = (e) => {
    console.log(e);
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

  // handlechange for the projects dropdown 
  handleDropdown = (e) => {
    console.log(e);
    let dropdownOptions = this.state.projects.filter(p => p.vmname.includes(e.target.value));
    this.setState({projectDropdown: e.target.value});
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
                                <div style={{ width: 400 }}>
                                    <Dropdown
                                    id="default"
                                    label="Dropdown menu options"
                                    items={items}
                                    itemToString={(item) => (item ? item.text : "")}
                                    onChange={this.handleDropdown}
                                    />
                                </div>
                                <div>
                                <label>Choose project:</label>
                                    <select 
                                    value={this.state.value} 
                                    onChange={this.handleDropdown}
                                    >
                                    {this.state.projects.map(p => (
                                        <option value={p.id}>{p.vmname}</option>
                                        ))}
                                    </select>
                                </div>
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
    )}
};

export default Projects;
