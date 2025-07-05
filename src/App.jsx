import { memo, useEffect, useMemo, useState } from 'react';

const Card = memo(({ name, image, position, biography }) => {
  return (
    <div >
      <h2>Name: {name}</h2>
      <img src={image} alt={name} />
      <p>Position: {position}</p>
      <p>Biography: {biography}</p>
    </div>
  );
});

function App() {
  const [politicians, setPoliticians] = useState([]);
  const [searchPolitician, setSearchPolitician] = useState('');
  const [selectPosition, setSelectPosition] = useState('');
  const getPoliticians = async () => {
    const response = await fetch(`http://localhost:3333/politicians`);
    const data = await response.json();

    setPoliticians(data);
  };

  useEffect(() => {
    getPoliticians();
  }, []);

  const filteredPoliticians = useMemo(() => {
    const search = searchPolitician.toLowerCase();
    let filtered = politicians;
    if (searchPolitician !== '') {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(search) || p.biography.toLowerCase().includes(search));
    }

    if (selectPosition) {
      filtered = filtered.filter(p => p.position === selectPosition);
    }
    return filtered;
  }, [searchPolitician, politicians, selectPosition]);

  const positionPoliticians = useMemo(() => {
    return politicians.reduce((acc, curr) => {
      if (!acc.includes(curr.position)) {
        acc.push(curr.position);
      }
      return acc;
    }, []);
  }, [politicians]);


  return (
    <>
      <h1>Ricerca Politici</h1>
      <p>Per position</p>
      <select value={selectPosition} onChange={e => setSelectPosition(e.target.value)}>
        <option value="">----</option>
        {positionPoliticians.map((p, i) => (
          <option key={i} value={p} >{p}</option>
        ))}
      </select>
      <p>Per Nome o Biografia</p>
      <input type="text" value={searchPolitician} onChange={e => setSearchPolitician(e.target.value)} />
      {filteredPoliticians.map(p => (
        <Card key={p.id}
          name={p.name}
          image={p.image}
          position={p.position}
          biography={p.biography}
        />
      ))}
    </>
  );
}

export default App;
