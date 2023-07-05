import React from 'react'
import Ticker from 'react-ticker'

const MoveStockInfo = () => {
  return (
    <>
      <Ticker mode='await' offset={5}>
          {() => (
            <>
                  <p>상승 1위 주식 상승 2위 주식 상승 3위 주식</p>
              </>
          )}
      </Ticker>
      <Ticker mode='await' offset={5} direction='toRight'>
          {() => (
            <>
                  <p>하락 1위 주식 하락 2위 주식 하락 3위 주식</p>
              </>
          )}
      </Ticker>
    </>
  )
}

export default MoveStockInfo