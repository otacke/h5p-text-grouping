import React from 'react';

import { H5PContext } from '../context/H5PContext';
import Category from './category/Category';
import Uncategorized from './uncategorized/Uncategorized';
import CategoryList from './categoryList/CategoryList';
import TextItem from './textItem/TextItem';

import './Main.scss';

/**
 * A component that defines the top-level layout and
 * functionality.
 * @param {object} props Props object
 * @returns {JSX.Element} the main content to be displayed
 */
export default function Main({ context }) {
  const {
    l10n,
    randomizedTextItems,
    params: { textGroups }
  } = context;

  const [currentCategoryAssignment, setCurrentCategoryAssignment] = React.useState([
    ...textGroups.map(() => []),
    randomizedTextItems
  ]);

  /**
   * Adds the listed text items to the category and removes them from others
   * @param {String} categoryId
   * @param {String[]} textItemIds An array of textItemIds
   */
  const addToCategory = (categoryId, textItemIds) => {
    textItemIds.array.forEach((textItemId) => {
      moveTextItem(textItemId, categoryId);
    });
  };

  /**
   * Moves a text item from its current category to a new one
   * @param {String} textItemId
   * @param {String} categoryId
   */
  const moveTextItem = (textItemId, categoryId) => {
    // TODO: Depending on how uncategorized is given after randomization, this might have to be implemented differently

    const newCategories = currentCategoryAssignment;

    // Remove from previous category
    newCategories.forEach((category) => {
      const textItemIndex = category.indexOf(textItemId);
      if (textItemIndex > -1) {
        category.splice(textItemIndex, 1);
      }
    });

    // Add to new category
    newCategories[parseInt(categoryId.substring(9))].push(textItemId);

    setCurrentCategoryAssignment(newCategories);
  };

  //Construct category elements
  const categoryElements = currentCategoryAssignment.map((category, i) => {
    if (i < textGroups.lenght) {
      <Category id={`category-${i}`} key={`category-${i}`} title={textGroups[i].groupName}>
        {category.forEach( textItem => (
          <TextItem
            key={textItem[0]}
            id={textItem[0]}
            moveTextItem={moveTextItem}
            displayedText={textItem[1]}
            buttonAriaLabel={l10n.ariaMoveToCategory}
            buttonHoverText={l10n.hoverMoveToCategory}
          />
        ))}
      </Category>;
    }
  });

  // Construct text item elements
  let textItemElements = [];
  currentCategoryAssignment[textGroups.lenght].forEach( textItem => {
    textItemElements.push(
      <TextItem
        key={textItem[0]}
        id={textItem[0]}
        moveTextItem={moveTextItem}
        displayedText={textItem[1]}
        buttonAriaLabel={l10n.ariaMoveToCategory}
        buttonHoverText={l10n.hoverMoveToCategory}
      />
    );
  });

  return (
    <H5PContext.Provider value={context}>
      <CategoryList>{categoryElements}</CategoryList>
      <Uncategorized>{textItemElements}</Uncategorized>
    </H5PContext.Provider>
  );
}
