import styled from 'styled-components';

const TableSize = (props) => {

    return (
        <>
            <SizeForm onSubmit={props.setTableSize}>
                <Select name="tableSize" id="tableSize" onChange={props.setTableSize}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </Select>
            </SizeForm>
        </>
    )
}


const Select = styled.select`
    width: 100px;
    text-align: center;
    height: 40px;
    border-radius: 10px;
    border: 1px solid #ccc;
    padding: 10px;
    font-size: 16px;
    color: #333;
    background-color: white;
    margin: 10px;
`;

const SizeForm = styled.form`
    display: flex;
`;

export default TableSize;