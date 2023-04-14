import * as React from 'react'
import { useEffect, useState } from 'react'



const SideNavBar = ({contentArr}) => {
    const [sectionIds, setSectionIds] = useState([])
    
    const [viewId, setViewId] = useState()
    
    const [scrollTimeout, setScrollTimeout] = useState(null)
    
    

    useEffect( () => {
        // console.log(contentArr, 'contentArr')
        
       
        const ids = Array.from(contentArr).map((section) => 
            section.id
        )

        // console.log(ids)
        setSectionIds(ids)

        const observer = new IntersectionObserver((entries) => {
            const visibleEntry = entries.find((entry) => entry.isIntersecting)
            // console.log(scrollTimeout)
            if (visibleEntry && !scrollTimeout) {
                
                // console.log(visibleEntry.target, 'is being observed')
                // console.log(visibleEntry.target.id, 'target id obs')
                
                let viewId = Number(visibleEntry.target.id.split('-')[1])
                // console.log(viewId)
                
                setViewId(viewId)
                    
                
                
            }
        }, {
            // rootMargin: "20% 20% 20% 20%"
            root:null,
            rootMargin: `0px 0px -100% 0px`
            
        })

        ids.forEach((id) => {
            const section = document.getElementById(id)
            if (section) {
                observer.observe(section)
            }
        })

        return () => {
            observer.disconnect()
            if (scrollTimeout) {
                clearTimeout(scrollTimeout)
            }
        }
    }, [scrollTimeout, contentArr])

    const handleViewChange = (id) => {
        const section = document.getElementById(id)
        let viewIdfromSect = Number(id.split('-')[1])
        if (scrollTimeout) {
            clearTimeout(scrollTimeout)
        }
        
        // console.log(id, 'id targeted')
        // console.log(viewId, 'viewid')
        
        
        section.scrollIntoView({behavior: "smooth"})
        
        const newScrollTimeoutId = setTimeout(() => {
            
            setViewId(viewIdfromSect)
            setScrollTimeout(null)
            
            
            
        }, 1000);

        setScrollTimeout(newScrollTimeoutId)
        
       
    }

   


    return (
        <div className='content-side-nav-div'>
            <div className='side-nav-wrap'>
            <h6 className='side-nav-content-title'>Content</h6>
            <ul className='content-side-nav'>
                {sectionIds.length > 0 ? sectionIds.map((section, index) => {
                    if (contentArr[index]) {
                        // console.log(contentArr[index].sectionTitle, 'sectionTitle')
                    }
                    

                    return <li key={section} className={index + 1 === viewId ? 'selected-side-nav' : null}>
                        <button className='side-nav-btn' data-indexnum={`btn-${index + 1}`} onClick={() => { handleViewChange(section)}}>
                            {/* <span className='side-nav-index'>{index + 1}.</span> */}
                            <span className='side-nav-title'>{contentArr[index].sectionTitle}</span>
                            </button>
                    </li>
                }): undefined}

            </ul>
            </div>

        </div>
    )

}

export default SideNavBar