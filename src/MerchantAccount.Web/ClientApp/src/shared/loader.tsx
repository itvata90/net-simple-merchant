import React from 'react';
import Container from 'src/core/components/container/container';
import Spinner from 'src/core/components/spinner/spinner';

const Loader = () => {
  return (
    <Container style={{ marginBlock: 20 }}>
      <Spinner />
    </Container>
  );
};

export default Loader;
