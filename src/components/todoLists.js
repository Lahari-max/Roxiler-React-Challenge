
import React,{useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery'; 

const TodoList = () =>{
      const [userData, setUserData] = useState([]);
  const [todoId, setTodoId] = useState('Null');
  const [title, setTitle] = useState('Null');

  const [data, setData] = useState([]);

  $(document).ready(function () {
    setTimeout(function(){
    $('#example').DataTable();
     } ,1000);
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
          .then((response) => response.json())
          .then((data) =>setData(data));
  },[]);

  const viewUser =(todoId, title, userId) =>{
    //console.log('user id '+userId);
    setTitle(title);
    setTodoId(todoId);
    fetch("https://jsonplaceholder.typicode.com/users/"+userId)
    .then((response) => response.json())
    .then((data) => setUserData(data));
  }
    return(
        <>
            <Container>
                <Row style={{marginTop:'20px'}}>
                    <Col>
                        <h5>Todo List</h5>
                        <div style={{border:'1px solid gray'}} className="container">
                            <table  id="example" class="table table-hover table-bordered">
                                    <thead>
                                        <tr>
                                        <th>TodoID</th>
                                        <th>Title</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((result) => {
                                            return (
                                            
                                                <tr>
                                                    <td>{result.id}</td>
                                                    <td>{result.title}</td>
                                                    <td>{result.completed? 'Complete':'Incomplete'}</td>
                                                    <td><button onClick={(e)=>viewUser(result.id, result.title, result.userId)}>View User</button></td>
                                                </tr>
                                            
                                            )
                                        })}
                                    </tbody>
                            </table>
                        </div>
                    </Col>
                    <Col>
                        <h5>User Details</h5>
                        <Card border="secondary" style={{ width: '30rem' }}>
                                <Row style={{padding:'1rem'}}>
                                    <Col>
                                        <Row style={{padding:'1rem'}}> ToDo ID </Row>
                                        <Row style={{padding:'1rem'}}> ToDo Title </Row>
                                        <Row style={{padding:'1rem'}}> User ID </Row>
                                        <Row style={{padding:'1rem'}}> Name </Row>
                                        <Row style={{padding:'1rem'}}> Email </Row>
                                    </Col>
                                    <Col>
                                        <Row style={{padding:'1rem'}}> {todoId} </Row>
                                        <Row style={{padding:'1rem'}}> {title} </Row>
                                        <Row style={{padding:'1rem'}}> {userData.id!==undefined?userData.id:'Null'} </Row>
                                        <Row style={{padding:'1rem'}}> {userData.name!==undefined?userData.name:'Null'} </Row>
                                        <Row style={{padding:'1rem'}}> {userData.email!==undefined?userData.email:'Null'} </Row>
                                    </Col>
                                </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default TodoList;