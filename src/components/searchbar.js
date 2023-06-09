import * as React from 'react'
import { useRef } from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'



const Searchbar = ({isBottom = false}) => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    const [isSearchOpen, setisSearchOpen] = useState(false)

    // const [isSearchLoading, setisSearchLoading] = useState(false)

    const [isResultOut, setIsResultOut] = useState(false)

    const overlayRef = useRef(null)

    

    // console.log(window.__FLEXSEARCH__.en.index, 'search index')
    // console.log(window.__FLEXSEARCH__.en.store, 'the searchbar store')

    const getSearchResults = (query) => {
        
        let index = window.__FLEXSEARCH__.en.index
        let store = window.__FLEXSEARCH__.en.store

        if (!index) {
            return []
        } else {
            
            
            let results = []
            Object.keys(index).forEach(idx => {
                results.push(...index[idx].values.search(query))
            })

            results = Array.from(new Set(results))

            let nodes = store.filter(node => (results.includes(node.id) ? node : null))
            .map(node => node.node)
            if (nodes.length > 0) {
                setResults(nodes)
            }
            
            
            
            setIsResultOut(true)
            // console.log(query, 'qery')
            // console.log(results, 'results')
            
        }
    }

    const toggleMenuOpen = () => {
        setResults([])
        setIsResultOut(false)
        
    }
    
    const handleInputChange = (e) => {
        
        const value = e.target.value
        if (value === '') {
            setResults([])
        }
        setQuery(value)
        // console.log('query set to', query)
        getSearchResults(value)
    }
    
    
    useEffect( () => {
        const overlayNode = overlayRef.current
        const handleKeydown = (event) => {
            if (event.key === 'Escape' && overlayRef.current) {
                event.preventDefault()
                setIsResultOut(false)
                
            }
        }

        overlayNode.addEventListener('keydown', handleKeydown)
        // removes the listener when unmounts
        return () => {
            overlayNode.removeEventListener('keydown', handleKeydown)
        }
    }, [setIsResultOut])
   


    return (
        <div className='search-btn-container'>
        <form className='search-btn-div'>
            
        <input type="text" placeholder={ isSearchOpen ? 'Enter keywords here...' : null} onInput={handleInputChange} value={query} className={ isSearchOpen ? "search-bar" : 'search-bar inactive'}>
        </input>
        <button className="searchBtn" onClick={(e) => {
            e.preventDefault()
           setQuery('')
            
            setisSearchOpen(!isSearchOpen)
            if (isResultOut === true ){
                setIsResultOut(false)
            }
        }}>
            <div className="search-icon-div"><StaticImage src='../components/styles/icons/search-icon.svg' alt='search icon'></StaticImage></div>
        </button>
        </form>
        <div ref={overlayRef} className={isResultOut ? 'overlay' : 'overlay hidden'} aria-disabled={isResultOut ? false : true} onClick={toggleMenuOpen} tabIndex="0" role="button" aria-label='Press Escape to close search menu'></div>
        <div className={isBottom === true? 'search-result-div from-bot' : 'search-result-div'}>
                
                <ul className='searchResult-list'>
                {results.length > 0 && isResultOut ? results.map((node) => {
                    return (
                        <li className='search-results-li' key={`searchR-${node.contentful_id}`}>
                            <Link to={`/category/${node.searchCategory}/${node.slug}`}>{node.title}</Link>
                        </li>
                    )
                }) : null}
                {results.length === 0 && isResultOut ?  <li>No results</li> : null}
                </ul>
            </div>
        </div>
    )
}

export default Searchbar
