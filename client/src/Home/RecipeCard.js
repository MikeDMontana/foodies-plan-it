import React, { Component } from 'react';

class RecipeCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.currentRecipe.title);
    return (
      <div className="recipeCardContainer">
        {this.props.currentRecipe.title}
      </div>
    );
  }

}

export default RecipeCard;
