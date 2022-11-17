import { Table } from "antd";



const columns = [
    {
        title: 'amount',
        dataIndex: 'amount',
        key: 'amount',
        fixed: 'right',
        render: x=>(`$${x}`)
    },
    {
      title: 'Start Date',
      dataIndex: 'start',
      key: 'start',
      render: x=>(new Date(x).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) )
    },
    {
      title: 'End Date',
      dataIndex: 'end',
      key: 'end',
      render:x=>(new Date(x).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) )
    },
  ];

function Payments(props) {
    return ( 
        <>
            <div style={{display:props.display}}>
                <Table dataSource={props.data} columns={columns} size={'small'} />
            </div>
        </>
     );
}

export default Payments;