import { useEffect } from 'react';
import './PlantDetail.css';
import { useState } from 'react';
import IPlantDetail from '../../../../models/interfaces/IPlantDetail';

export default function PlantDetail({ detailName, description }: IPlantDetail) {
  const [formattedDescription, setFormattedDescription] = useState<string | undefined | JSX.Element[]>(
    description
  );

  useEffect(() => {
    if (typeof description === 'boolean') {
      const formattedBoolean = description ? 'Tak' : 'Nie';
      setFormattedDescription(formattedBoolean);
    } else if (typeof description === 'string') {
      const formatted = description.split('\n').map((line, index) => (
        <span key={index}>
          {line}
          <br /><br />
        </span>
      ));
      setFormattedDescription(formatted);
    }
  }, [description]);

  return (
    <>
      <div className="plant-detail">
        <div className="plant-detail-left">
          <span className="detail-name">{detailName}</span>
        </div>
        <div className="plant-detail-right">
          <span className="detail-description">{formattedDescription}</span>
        </div>
      </div>
    </>
  );
}