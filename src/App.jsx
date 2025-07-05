import { memo, useEffect, useMemo, useState } from 'react';

const Card = memo(({ name, image, position, biography }) => {
  console.log('Rendering...');
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
