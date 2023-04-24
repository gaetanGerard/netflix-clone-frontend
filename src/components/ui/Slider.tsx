import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Import Redux
import { RootState } from "../../redux/root-reducer";

// Import Custom Components
import ItemCard from './ItemCard';
import Typography from './Typography';
import Chevron from './icons/Chevron';

// Import Styles
import '../../styles/slider.scss';

// Import Utils
import { itemInMyList } from '../../utils/function';

type CardItem = {
    id: string,
    title?: string,
    name?: string,
    backdrop_path?: string,
    poster_path?: string,
    genre_ids: number[],
    media_type?: string,
    overview?: string,
    vote_average?: number
    number_of_seasons?: number,
    number_of_episodes?: number
    runtime?: number
}

interface ISliderProps {
  items: Array<CardItem>;
  sliderTitle: string;
  position?: number;
}

const Slider: React.FC<ISliderProps> = ({ items, sliderTitle, position }) => {
    const p = useSelector((state: RootState) => state.profile.profile);
    const [currentIndex, setCurrentIndex] = useState(0);
    // console.log(items)
    const newList = items.filter((item) => item.poster_path || item.backdrop_path)

    const handlePrevClick = () => {
        if (currentIndex === 0) {
        setCurrentIndex(items.length - 1);
        } else {
        setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (currentIndex === items.length - 1) {
        setCurrentIndex(0);
        } else {
        setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div className={`slider-container slider-position-${position}`}>
            <Typography HTMLElement="h2" classname="slider-title">{sliderTitle}</Typography>
            <div className="slider-wrapper" style={{ transform: `translateX(-${currentIndex * 225}px)` }}>
                {newList.map((item, index=1) => (
                <div key={index} className="slider-item">
                    <ItemCard key={item.id} item={item} itemID={index++} isInMyList={itemInMyList(p.profile.my_list, item)} />
                </div>
                ))}
            </div>
            <button className="slider-button slider-button-prev" onClick={handlePrevClick}>
                <Chevron classname="icon" />
            </button>
            <button className="slider-button slider-button-next" onClick={handleNextClick}>
                <Chevron classname="icon" />
            </button>
        </div>
    );
};

export default Slider;