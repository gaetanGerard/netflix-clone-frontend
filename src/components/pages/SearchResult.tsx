import React, {useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from "@apollo/client";

// Import Utils
import { itemInMyList } from '../../utils/function';
import { MULTI_SEARCH } from '../../utils/query';

// Import Redux
import { setApplicationLanguage, resetShowModal, setSearchResult } from '../../redux/utils/utils.actions';
import { RootState } from "../../redux/root-reducer";

// Import Data
import footerData from '../../data/footer.json';
import pageLangData from '../../data/seriesMoviesMyList.json';

// Import styles
import '../../styles/searchResult.scss';

// Import Custom Components
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import ItemCard from '../ui/ItemCard';
import Typography from '../ui/Typography';
import Pagination from '../ui/Pagination';
import Modal from "../ui/Modal";

export const SearchResult = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const lang = useSelector((state: RootState) => state.utils.language);
    const options = useSelector((state: RootState) => state.utils.languageOptions);
    const p = useSelector((state: RootState) => state.profile.profile);
    const searchResult = useSelector((state: RootState) => state.utils.searchResult);
    const searchQuery = useSelector((state: RootState) => state.utils.searchQuery);
    const showModal = useSelector((state: RootState) => state.utils.showModal);
    const mediaType = useSelector((state: RootState) => state.utils.mediaType);
    const movie = useSelector((state: RootState) => state.movies.movie);
    const movieCast = useSelector((state: RootState) => state.movies.movieCast);
    const tv = useSelector((state: RootState) => state.series.series);
    const language = p ? p.profile.language : lang;
    const [langData, setLangData] = useState(pageLangData[language])
    const [currentPage, setCurrentPage] = useState(searchResult ? searchResult.page : null)
    const [content, setContent] = useState(null)
    const [isInMyList, setIsInMyList] = useState(false)

    useEffect(() => {
        document.title = langData?.searchResult.documentTitle
    }, [langData, language])

    // if searchResult is null or empty, redirect to home page
    useEffect(() => {
        if(searchResult === null || searchResult.length === 0) {
            navigate('/home')
        }
    }, [navigate, searchResult])

    const [performSearch, { loading, data }] = useLazyQuery(MULTI_SEARCH, {
        variables: { query: searchQuery, language: p?.profile?.language, page: currentPage?.toString() },
      });

    const changeLanguage = (e: any) => {
        dispatch(setApplicationLanguage(e.target.value))
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
        performSearch({ variables: { query: searchQuery, language: p.profile.language, page: page.toString() }});
    }

    useEffect(() => {
        if(data) {
            dispatch(setSearchResult(data.getSearchMulti))
        }
    }, [searchResult, currentPage, data, dispatch])

    useEffect(() => {
        if(mediaType === "movie") {
            setContent(movie)
        } else if (mediaType === "tv") {
            setContent(tv)
        }
    }, [mediaType, movie, tv])

    useEffect(() => {
        if(content) {
            setIsInMyList(itemInMyList(p.profile.my_list, content))
        }
    }, [content, p?.profile.my_list])

    if(p && searchResult) {
        const filteredResult = searchResult?.results.filter((item: any) => {
            const numProps = Object.keys(item).length;
            return numProps > 1;
        })

        const resultOnlyWithImage = filteredResult.filter((item) => item.poster_path || item.backdrop_path)

        return (
            <div className="home-container no-featuredListItem searchResult-container">
                <Header />
                {showModal && <Modal onClose={() => dispatch(resetShowModal())} mediaType={mediaType} content={mediaType === "movie" ? movie : tv} movieCredits={mediaType === "movie" ? movieCast : null} isInMyList={isInMyList} />}
                <div className="search-body-container">
                <Typography HTMLElement="h2" classname="title">{langData.searchResult.title} : <span>{searchQuery}</span></Typography>
                    <div className="card-container">
                        {resultOnlyWithImage.map((item: any, i: number) => (
                            item !== undefined ? (<ItemCard key={item.id} item={item} itemID={i++} isInMyList={itemInMyList(p.profile.my_list, item)} />) : null))
                        }
                    </div>
                </div>
                <Pagination totalPages={searchResult.total_pages} currentPage={currentPage} onPageChange={handlePageChange} />
                <Footer data={footerData[lang.iso]} options={options} language={lang.iso} changeLanguage={changeLanguage} />
            </div>
        )
    } else {
        return <div>Loading...</div>
    }

}

export default SearchResult