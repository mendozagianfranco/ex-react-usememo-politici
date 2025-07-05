import { useEffect, useMemo, useState } from 'react';

function App() {
  const [politicians, setPoliticians] = useState([]);
  const [searchPolitician, setSearchPolitician] = useState('');

  const getPoliticans = async () => {
    const response = await fetch(`http://localhost:3333/politicians`);
    const data = await response.json();

    setPoliticians(data);
  };

  useEffect(() => {
    getPoliticans();
  }, []);

  const filteredPolitians = useMemo(() => {
    const search = searchPolitician.toLowerCase();
    return politicians.filter(p => p.name.toLowerCase().includes(search) || p.biography.toLowerCase().includes(search));
  }, [searchPolitician, politicians]);

  return (
    <>
      <h1>Ricerca Politici</h1>
      <input type="text" value={searchPolitician} onChange={e => setSearchPolitician(e.target.value)} />
      {filteredPolitians.map(p => (
        <div key={p.id}>
          <h2>Name: {p.name}</h2>
          <img src={p.image} alt={p.name} />
          <p>Position: {p.position}</p>
          <p>Biography: {p.biography}</p>
        </div>
      ))}
    </>
  );
}

export default App;
