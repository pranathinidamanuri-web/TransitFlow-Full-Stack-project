import { useEffect, useState } from 'react';
import API from '../services/api';

function Home() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    API.get('/routes')
      .then(res => setRoutes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Available Routes</h2>

      {routes.map((route) => (
        <div key={route.id}>
          <p>{route.route_from} → {route.route_to}</p>
          <p>
  Time: {new Date(route.departure_time).toLocaleString()}
</p>
        </div>
      ))}
    </div>
  );
}

export default Home;