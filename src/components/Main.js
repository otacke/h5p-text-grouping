import React from 'react';
import Category from './category/Category';
import './Main.scss';
import TextItem from './text-item/TextItem';

/**
 * A component that defines the top-level layout and
 * functionality.
 * @param {object} context
 * @returns the main content to be displayed
 */
export default function Main(context) {
  // Dummy return statement
  return (
    <div>
      <Category title="Category">
        <TextItem />
        <TextItem />
        <TextItem />
      </Category>
    </div>
  );
}
