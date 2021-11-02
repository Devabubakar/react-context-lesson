import React, { useContext } from 'react';


import CollectionPreview from '../collection-preview/collection-preview.component';



import './collections-overview.styles.scss';
import CollectionContext from '../../contexts/collections/collections.context';

const CollectionsOverview = () => {
  const collectionObject = useContext(CollectionContext);
  const collections = Object.keys(collectionObject).map(
    (key) => collectionObject[key]
  );
  return (
    <div className='collections-overview'>
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

export default CollectionsOverview;
