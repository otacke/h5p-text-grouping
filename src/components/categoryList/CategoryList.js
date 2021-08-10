import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { H5PContext } from '../../context/H5PContext';

import Category from '../category/Category';

import './CategoryList.scss';

/**
 * A component that contains 1 to n categories, and
 * determines their top-level layout and logic.
 * @param {object} props Props object
 * @returns {JSX.Element} The CategoryList element
 */
export default function CategoryList({
  moveTextItems,
  allTextItems,
  categoryAssignment,
  removeAnimations,
  draggingStartedHandler,
  draggedInfo
}) {
  const [marginBottom, setMarginBottom] = useState(null);
  const categoryListRef = useRef(null);
  const {params: {textGroups}} = useContext(H5PContext);

  /**
   * Set the bottom margin if not enough space for the content
   * @param {number} height The minimal height needed to display the content
   */
  const setMargin = (height) => {
    const heightDifference = height - categoryListRef.current.offsetHeight;
    setMarginBottom(heightDifference > 0 ? heightDifference : null);
  };

  const categoryElements = categoryAssignment.map((category, categoryId) => {
    if (categoryId < textGroups.length) {
      return (
        <Category
          categoryId={categoryId}
          key={`category-${categoryId}`}
          moveTextItems={moveTextItems}
          allTextItems={allTextItems}
          categoryAssignment={categoryAssignment}
          draggedInfo={draggedInfo}
          textItems={{
            category: category,
            categories: [...textGroups, { groupName: 'Uncategorized' }],
            removeAnimations: removeAnimations
          }}
          setContainerHeight={setMargin}
          draggingStartedHandler={draggingStartedHandler}
        />
      );
    }
  });

  return (
    <div
      className={`categoryList${categoryElements.length < 2 ? ' singleCategory' : ''}`}
      style={{ marginBottom: marginBottom }}
      ref={categoryListRef}
    >
      {categoryElements}
    </div>
  );
}

CategoryList.propTypes = {
  moveTextItems: PropTypes.func.isRequired,
  allTextItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string,
      shouldAnimate: PropTypes.bool
    })
  ).isRequired,
  categoryAssignment: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string,
        shouldAnimate: PropTypes.bool
      })
    )
  ).isRequired,
  removeAnimations: PropTypes.func.isRequired,
  draggingStartedHandler: PropTypes.func.isRequired,
  draggedInfo: PropTypes.shape({
    style: PropTypes.object.isRequired,
    firstChildClassNames: PropTypes.object.isRequired,
    dropzoneVisible: PropTypes.number.isRequired
  }).isRequired
};
