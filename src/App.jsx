import { useEffect, useState } from 'react';

function App() {
  const [politicians, setPoliticians] = useState([]);

  const getPoliticans = async () => {
    const response = await fetch(`http://localhost:3333/politicians`);
    const data = await response.json();

    setPoliticians(data);
  };

  useEffect(() => {
    getPoliticans();
  }, []);

  return (
    <>
      {politicians.map(p => (
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
