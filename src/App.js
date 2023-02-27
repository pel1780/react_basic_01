import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// 1. api : db가 존재함
// 2. db에서 데이터를 가져온다 useEffect 데이터 가져올때 react에서 사용하는 방법
// 3. 가져온 데이터를 react로 뿌려준다
const H1 = styled.h1`
text-align: center;
`
const Search = styled.div`
text-align: center;
padding: 20px;
`
const UL = styled.ul`
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 10px;
list-style: none;
margin: 0;
padding: 10px;
img{
  max-width: 100%;
}
@media(max-width: 768px){
  display: grid;
grid-template-columns: repeat(3, 1fr);
}

`

function App() {
  const [pic, setPic] = useState([]);
  const [s, setS] = useState('water');
  const getData = async () => {
    const data = await fetch(`https://pixabay.com/api/?key=21103852-9b5f4834542caaf4eef2c8533&q=${s}&image_type=photo`).then(r => r.json());
    // console.log(data, data.hits);
    setPic(data.hits);
  }

  useEffect(() => {
    getData();
  }, [s]); //[]를 해주면 한번만 실행한다

  return (
    <>
      <H1>Kim PIC</H1>
      <Search>search : <input type="text" onChange={(e) => setS(e.target.value)} value={s} /></Search>
      <UL>
        {
          pic.map(it => {
            return (
              <li key={it.id}>
                <h2>{it.tags}</h2>
                <img src={it.largeImageURL} alt="" />
              </li>
            )
          })
        }
      </UL>
    </>
  );
}

export default App;
