import React from 'react'
import Ticker from 'react-ticker'

const MoveStockInfo = () => {
  return (
    <Ticker mode='await' offset={5}>
        {() => (
            <>
                <p>1번 주식 2번 주식 3번 주식</p>
            </>
        )}
    </Ticker>
  )
}

export default MoveStockInfo