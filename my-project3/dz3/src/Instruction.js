import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import styles from './Instruction.module.css';
import image1 from './image1.jpg';
import image2 from './image2.png';
import image3 from './image3.jpg';

class Instruction extends Component {
  constructor(props) {
    super(props);
    this.state = {
        images: [
          { id: uuidv4(), src: image1, visible: false },
          { id: uuidv4(), src: image2, visible: false },
          { id: uuidv4(), src: image3, visible: false },
        ],
      };            
  }

  toggleImage = (id) => {
    this.setState((prevState) => ({
      images: prevState.images.map((img) =>
        img.id === id ? { ...img, visible: !img.visible } : img
      ),
    }));
  };

  render() {
    return (
      <div className={styles.container}>
        {this.state.images.map((img) => (
          <div key={img.id} className={styles.imageContainer}>
            <button onClick={() => this.toggleImage(img.id)} className={styles.button}>
              Toggle Image {img.id}
            </button>
            {img.visible && <img src={img.src} alt="" className={styles.image} />}
          </div>
        ))}
      </div>
    );
  }  
}

Instruction.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      visible: PropTypes.bool.isRequired,
    })
  ),
};

export default Instruction;
