import React, { Fragment } from 'react';

import Form from '../Form';
import Error from '../Error';
import Loader from './Loader/Loader';
import Forecast from '../Forecast';

import useForecast from '../../hooks/useForecast';

import styles from './WeatherApp.css';

const WeatherApp = () => {
  const { isError, isLoading, forecast, submitRequest } = useForecast();

  const onSubmit = value => {
    submitRequest(value);
  };

  return (
    <Fragment>
      {!forecast && (
        <div className={`${styles.box} position-relative`}>
          {/* Form */}
          {!isLoading && <Form submitSearch={onSubmit} />}
          {/* Error */}
          {isError && <Error message={isError} />}
          {/* Loader */}
          {isLoading && <Loader />}
        </div>
      )}
      {/* Forecast */}
      {forecast && <Forecast forecast={forecast} />}
    </Fragment>
  );
};

export default WeatherApp;
