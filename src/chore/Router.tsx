/**
 * DO NOT UPDATE THIS FILE
 *
 * This file is created to make the exercises friendly. Any update can break the exercises.
 */

import React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { EXERCISES } from './exercises';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {EXERCISES.map((exercise) => (
        <React.Fragment key={exercise.name}>
          <Route
            key={exercise.name}
            path={`/${exercise.name}`}
            element={<div>{exercise.components}</div>}
          />

          <Route
            path={`/${exercise.name}/*`}
            element={<Navigate to={`/${exercise.name}`} replace={true} />}
          />
        </React.Fragment>
      ))}
    </Routes>
  );
};

const Home = () => {
  return (
    <div className="navigation-page">
      <h1 className="work-sans">BeginReact - Les hooks</h1>
      <div className="nav-list">
        {EXERCISES.map((exercise, i) => (
          <Link key={i} to={`/${exercise.name}`}>
            {exercise.name}
          </Link>
        ))}
      </div>
      <p>
        Les liens te permettent de te repérer dans les exercises.
        <br />
        Si tu es perdu ou tu as des problèmes, rejoins le discord et n'hésite pas à
        demander de l'aide.
      </p>
    </div>
  );
};
