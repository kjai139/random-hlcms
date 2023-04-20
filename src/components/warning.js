import * as React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'gatsby'




const WarningComp = ({acknowledged}) => {
    const [warningAcknowledged, setWarningAcknowledged] = useState(false)
    const [displayOverlay, setdisplayOverlay] = useState(false)
    const [safariCookieMsg, setSafariCookieMsg] = useState('')


    useEffect(() => {
        const isAcknowledged = localStorage.getItem('warningAcknowledged')
        const numberOfVisits = parseInt(localStorage.getItem('numOfVisit'))

        if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1 ) {
            document.hasStorageAccess().then(hasAccess => {
                if (!hasAccess) {
                    setSafariCookieMsg('If you see this message please disable blocking all cookies on your Safari')
                }
            })
        }
        // console.log(isAcknowledged, numberOfVisits, 'acknowledge num check')
        if (isAcknowledged) {
            localStorage.setItem('numOfVisit', numberOfVisits + 1)
            // console.log(localStorage.getItem('numOfVisit'), '< num added 1 ')
            
            setWarningAcknowledged(true)
            if (numberOfVisits % 5 === 0) {
                localStorage.removeItem('warningAcknowledged')
                localStorage.removeItem('numOfVisit')
                // console.log('storage removed')
            }
        } else {
            setdisplayOverlay(true)
        }
    }, [])


    const handleWarning = () => {
        setWarningAcknowledged(true)
        localStorage.setItem('warningAcknowledged', true)
        localStorage.setItem('numOfVisit', 1)
        
    }



    return (
        <>
        {safariCookieMsg.length > 2 && <div className='cookie-msg'>{safariCookieMsg}</div>}
        {!warningAcknowledged && displayOverlay && 
        <div className='warning-overlay'>
            <div className='warning-container'>
                <h2 className='warning-title'>Warning! Section contains explicit/adult content. Are you 18+ years old?</h2>
                <div className='warning-btn-cont'>
                    <button className='warning-btns' onClick={handleWarning}>
                        Yes, I am
                    </button>
                    <Link to='/' style={{display: 'flex', flex: '1'}}>
                    <button className='warning-btns'>
                        No, get me out
                    </button>
                    </Link>
                </div>
            </div>
        </div>
        }
        </>
    
    )
}

export default WarningComp