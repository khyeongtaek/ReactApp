import { useOutletContext } from 'react-router-dom';

const Setting = () => {
  const { name, age } = useOutletContext();
  return (
    <div>
      <h3>Setting</h3>
      <ul>
        <li>{name}</li>
        <li>{age}</li>
      </ul>
    </div>
  );
};

export default Setting;