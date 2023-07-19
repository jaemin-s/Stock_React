
import './IdModal.scss';
import axios from 'axios';

const IdModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  _searchUserID = async function() {
    const user_name = document.getElementsById('searchName')[0].value.trim();
    const user_phoneNumber = document.getElementsById('searchPhoneNumber')[0].value.trim();
   
  const obj = { 
    user_name : user_name,
    user_phoneNumber : user_phoneNumber,
    
}
  
const res = await axios('/searchId', {
    method : 'POST',
    data : obj,
    headers: new Headers()
})
  

 
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main><div className='Search_div'>
                <div>  
                  <h5> 이름 </h5>
                  <input type='text' maxLength='6' id='searchName'/>
                </div>

                <div>  
                  <h5> 전화번호 </h5>
                <input type='text' maxLength='11' placeholder="- 제외한 숫자만 입력" id='searchPhoneNumber' />
                 
                </div>

               
                <div>
                  <input type='button' value='조회하기' className='submit'/>
                </div>
              </div></main>
        
        </section>
      ) : null}
    </div>
  );
      }
      
    }

export default IdModal;